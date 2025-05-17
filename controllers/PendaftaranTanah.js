// controllers/PendaftaranTanahController.js
import PendaftaranTanah from "../models/PendaftaranTanahModel.js";
import { Op } from "sequelize";

export const buatPendaftaranTanah = async (req, res) => {
  try {
    const dataPendaftaran = await PendaftaranTanah.create(req.body);

    res.status(201).json({
      sukses: true,
      pesan: "Pendaftaran tanah berhasil dibuat",
      data: dataPendaftaran,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal membuat pendaftaran tanah",
      error: error.message,
    });
  }
};

export const dapatkanSemuaPendaftaran = async (req, res) => {
  try {
    const semuaPendaftaran = await PendaftaranTanah.findAll({
      order: [["tanggal", "DESC"]],
    });

    res.status(200).json({
      sukses: true,
      jumlah: semuaPendaftaran.length,
      data: semuaPendaftaran,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data pendaftaran",
      error: error.message,
    });
  }
};

export const dapatkanPendaftaranById = async (req, res) => {
  try {
    const { id } = req.params;
    const pendaftaran = await PendaftaranTanah.findByPk(id);

    if (!pendaftaran) {
      return res.status(404).json({
        sukses: false,
        pesan: "Pendaftaran tanah tidak ditemukan",
      });
    }

    res.status(200).json({
      sukses: true,
      data: pendaftaran,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data pendaftaran",
      error: error.message,
    });
  }
};

export const updatePendaftaran = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await PendaftaranTanah.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({
        sukses: false,
        pesan: "Pendaftaran tanah tidak ditemukan",
      });
    }

    const pendaftaranUpdated = await PendaftaranTanah.findByPk(id);
    res.status(200).json({
      sukses: true,
      pesan: "Pendaftaran tanah berhasil diperbarui",
      data: pendaftaranUpdated,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal memperbarui pendaftaran tanah",
      error: error.message,
    });
  }
};

export const hapusPendaftaran = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PendaftaranTanah.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        sukses: false,
        pesan: "Pendaftaran tanah tidak ditemukan",
      });
    }

    res.status(200).json({
      sukses: true,
      pesan: "Pendaftaran tanah berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal menghapus pendaftaran tanah",
      error: error.message,
    });
  }
};

export const cariPendaftaran = async (req, res) => {
  try {
    const { nomor_registrasi, nik_penjual, nik_pembeli, nama_penjual, nama_pembeli } = req.query;
    const where = {};

    if (nomor_registrasi) where.nomor_registrasi = { [Op.like]: `%${nomor_registrasi}%` };
    if (nik_penjual) where.nik_penjual = nik_penjual;
    if (nik_pembeli) where.nik_pembeli = nik_pembeli;
    if (nama_penjual) where.nama_penjual = { [Op.like]: `%${nama_penjual}%` };
    if (nama_pembeli) where.nama_pembeli = { [Op.like]: `%${nama_pembeli}%` };

    const hasilPencarian = await PendaftaranTanah.findAll({ where });

    res.status(200).json({
      sukses: true,
      jumlah: hasilPencarian.length,
      data: hasilPencarian,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal melakukan pencarian",
      error: error.message,
    });
  }
};

export const dapatkanPendaftaranTerbaru = async (req, res) => {
  try {
    const pendaftaranTerbaru = await PendaftaranTanah.findOne({
      order: [["tanggal", "DESC"]],
    });

    res.status(200).json({
      sukses: true,
      data: pendaftaranTerbaru || null,
    });
  } catch (error) {
    res.status(500).json({
      sukses: false,
      pesan: "Gagal mengambil data pendaftaran terbaru",
      error: error.message,
    });
  }
};