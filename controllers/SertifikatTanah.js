// controllers/SertifikatTanahController.js
import SertifikatTanah from "../models/SertifikatTanahModels.js";
import { Op } from "sequelize";

export const buatSertifikat = async (req, res) => {
  try {
    // Validasi field yang diperlukan
    const requiredFields = [
      'nomor_registrasi', 'tanggal', 'nama_pemilik', 'usia_pemilik',
      'pekerjaan_pemilik', 'alamat_pemilik', 'nik_pemilik', 'objek_tanah',
      'luas_tanah', 'sempadan_utara', 'sempadan_selatan', 'sempadan_timur',
      'sempadan_barat', 'dasar_penerbitan', 'nama_pemohon'
    ];

    const missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        sukses: false,
        pesan: `Field berikut harus diisi: ${missingFields.join(', ')}`
      });
    }

    // Cek duplikasi nomor registrasi dan NIK
    const existingReg = await SertifikatTanah.findOne({ 
      where: { nomor_registrasi: req.body.nomor_registrasi } 
    });
    
    if (existingReg) {
      return res.status(400).json({
        sukses: false,
        pesan: 'Nomor registrasi sudah digunakan'
      });
    }

    const existingNik = await SertifikatTanah.findOne({ 
      where: { nik_pemilik: req.body.nik_pemilik } 
    });
    
    if (existingNik) {
      return res.status(400).json({
        sukses: false,
        pesan: 'NIK pemilik sudah terdaftar'
      });
    }

    const sertifikatBaru = await SertifikatTanah.create(req.body);

    res.status(201).json({
      sukses: true,
      pesan: "Sertifikat tanah berhasil dibuat",
      data: sertifikatBaru
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal membuat sertifikat tanah",
      error: error.message
    });
  }
};

export const dapatkanSemuaSertifikat = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'tanggal', sortOrder = 'DESC' } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await SertifikatTanah.findAndCountAll({
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      sukses: true,
      jumlah_total: count,
      halaman: parseInt(page),
      per_halaman: parseInt(limit),
      jumlah_data: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data sertifikat",
      error: error.message
    });
  }
};

export const dapatkanSertifikatById = async (req, res) => {
  try {
    const { id } = req.params;
    const sertifikat = await SertifikatTanah.findByPk(id);

    if (!sertifikat) {
      return res.status(404).json({
        sukses: false,
        pesan: "Sertifikat tanah tidak ditemukan"
      });
    }

    res.status(200).json({
      sukses: true,
      data: sertifikat
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data sertifikat",
      error: error.message
    });
  }
};

export const updateSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validasi data yang akan diupdate
    if (req.body.nomor_registrasi) {
      const existing = await SertifikatTanah.findOne({
        where: {
          nomor_registrasi: req.body.nomor_registrasi,
          id: { [Op.ne]: id } // Exclude current record
        }
      });
      
      if (existing) {
        return res.status(400).json({
          sukses: false,
          pesan: 'Nomor registrasi sudah digunakan'
        });
      }
    }

    if (req.body.nik_pemilik) {
      const existing = await SertifikatTanah.findOne({
        where: {
          nik_pemilik: req.body.nik_pemilik,
          id: { [Op.ne]: id } // Exclude current record
        }
      });
      
      if (existing) {
        return res.status(400).json({
          sukses: false,
          pesan: 'NIK pemilik sudah terdaftar'
        });
      }
    }

    const [updated] = await SertifikatTanah.update(req.body, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        sukses: false,
        pesan: "Sertifikat tanah tidak ditemukan"
      });
    }

    const sertifikatUpdated = await SertifikatTanah.findByPk(id);
    res.status(200).json({
      sukses: true,
      pesan: "Sertifikat tanah berhasil diperbarui",
      data: sertifikatUpdated
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal memperbarui sertifikat tanah",
      error: error.message
    });
  }
};

export const hapusSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SertifikatTanah.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        sukses: false,
        pesan: "Sertifikat tanah tidak ditemukan"
      });
    }

    res.status(200).json({
      sukses: true,
      pesan: "Sertifikat tanah berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal menghapus sertifikat tanah",
      error: error.message
    });
  }
};

export const cariSertifikat = async (req, res) => {
  try {
    const { 
      nomor_registrasi, 
      nik_pemilik, 
      nama_pemilik, 
      tanggal_awal, 
      tanggal_akhir,
      page = 1, 
      limit = 10,
      sortBy = 'tanggal',
      sortOrder = 'DESC'
    } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};

    if (nomor_registrasi) where.nomor_registrasi = { [Op.like]: `%${nomor_registrasi}%` };
    if (nik_pemilik) where.nik_pemilik = nik_pemilik;
    if (nama_pemilik) where.nama_pemilik = { [Op.like]: `%${nama_pemilik}%` };
    
    if (tanggal_awal && tanggal_akhir) {
      where.tanggal = {
        [Op.between]: [tanggal_awal, tanggal_akhir]
      };
    } else if (tanggal_awal) {
      where.tanggal = {
        [Op.gte]: tanggal_awal
      };
    } else if (tanggal_akhir) {
      where.tanggal = {
        [Op.lte]: tanggal_akhir
      };
    }

    const { count, rows } = await SertifikatTanah.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      sukses: true,
      jumlah_total: count,
      halaman: parseInt(page),
      per_halaman: parseInt(limit),
      jumlah_data: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal melakukan pencarian",
      error: error.message
    });
  }
};

export const dapatkanSertifikatTerbaru = async (req, res) => {
  try {
    const sertifikatTerbaru = await SertifikatTanah.findOne({
      order: [['tanggal', 'DESC']]
    });

    res.status(200).json({
      sukses: true,
      data: sertifikatTerbaru || null
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil sertifikat terbaru",
      error: error.message
    });
  }
};