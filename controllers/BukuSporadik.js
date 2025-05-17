// controllers/BukuSporadikController.js
import BukuSporadik from "../models/BukuSporadikModels.js";
import { Op } from "sequelize";

export const buatEntriBuku = async (req, res) => {
  try {
    // Validasi data yang diperlukan
    const requiredFields = [
      'nomor_registrasi', 'tanggal', 'nama_pemilik', 'usia_pemilik',
      'pekerjaan_pemilik', 'alamat_pemilik', 'nik_pemilik', 'objek_tanah',
      'luas_tanah', 'sempadan_utara', 'sempadan_selatan', 'sempadan_timur',
      'sempadan_barat', 'alas_hak', 'nama_pemohon'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          sukses: false,
          pesan: `Field ${field} harus diisi`
        });
      }
    }

    const dataBaru = await BukuSporadik.create(req.body);

    res.status(201).json({
      sukses: true,
      pesan: "Entri buku sporadik berhasil dibuat",
      data: dataBaru
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal membuat entri baru",
      error: error.message
    });
  }
};

export const dapatkanSemuaEntri = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await BukuSporadik.findAndCountAll({
      order: [["tanggal", "DESC"]],
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
      pesan: "Gagal mengambil data entri",
      error: error.message
    });
  }
};

export const dapatkanEntriById = async (req, res) => {
  try {
    const { id } = req.params;
    const entri = await BukuSporadik.findByPk(id);

    if (!entri) {
      return res.status(404).json({
        sukses: false,
        pesan: "Entri tidak ditemukan"
      });
    }

    res.status(200).json({
      sukses: true,
      data: entri
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data entri",
      error: error.message
    });
  }
};

export const perbaruiEntri = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await BukuSporadik.update(req.body, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        sukses: false,
        pesan: "Entri tidak ditemukan"
      });
    }

    const entriUpdated = await BukuSporadik.findByPk(id);
    res.status(200).json({
      sukses: true,
      pesan: "Entri berhasil diperbarui",
      data: entriUpdated
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal memperbarui entri",
      error: error.message
    });
  }
};

export const hapusEntri = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BukuSporadik.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        sukses: false,
        pesan: "Entri tidak ditemukan"
      });
    }

    res.status(200).json({
      sukses: true,
      pesan: "Entri berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal menghapus entri",
      error: error.message
    });
  }
};

export const cariEntri = async (req, res) => {
  try {
    const { 
      nomor_registrasi, 
      nik_pemilik, 
      nama_pemilik, 
      tanggal_awal, 
      tanggal_akhir,
      page = 1, 
      limit = 10 
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

    const { count, rows } = await BukuSporadik.findAndCountAll({
      where,
      order: [["tanggal", "DESC"]],
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

export const dapatkanEntriTerbaru = async (req, res) => {
  try {
    const entriTerbaru = await BukuSporadik.findOne({
      order: [["tanggal", "DESC"]]
    });

    res.status(200).json({
      sukses: true,
      data: entriTerbaru || null
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil entri terbaru",
      error: error.message
    });
  }
};