// models/BukuSporadik.js
import { DataTypes } from "sequelize";
import { db_app } from "../config/Database.js";

const BukuSporadik = db_app.define(
  "buku_sporadik",
  {
 id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nomor_registrasi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'no_reg'
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nama_pemilik: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usia_pemilik: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pekerjaan_pemilik: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat_pemilik: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nik_pemilik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nik'
    },
    objek_tanah: {
      type: DataTypes.STRING,
      allowNull: false
    },
    luas_tanah: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sempadan_utara: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'batas_utara'
    },
    sempadan_selatan: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'batas_selatan'
    },
    sempadan_timur: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'batas_timur'
    },
    sempadan_barat: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'batas_barat'
    },
    alas_hak: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_pemohon: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pemohon'
    }
      },
  {
    freezeTableName: true,
  }
);

export default BukuSporadik;