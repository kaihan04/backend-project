// models/PendaftaranTanah.js
import { DataTypes } from "sequelize";
import { db_app } from "../config/Database.js";

const PendaftaranTanah = db_app.define(
  "pendaftaran_tanah",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nomor_registrasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    alas_hak: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_penjual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usia_penjual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pekerjaan_penjual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_penjual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik_penjual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usia_pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pekerjaan_pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik_pembeli: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    objek_tanah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sempandan_barat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ukuran_tanah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yang_membawa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batas_barat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batas_timur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batas_utara: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batas_selatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default PendaftaranTanah;
