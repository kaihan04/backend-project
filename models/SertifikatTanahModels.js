// models/SertifikatTanah.js
import { DataTypes } from "sequelize";
import { db_app } from "../config/Database.js";

const SertifikatTanah = db_app.define(
  "sertifikat_tanah", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nomor_registrasi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
      unique: true
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
      allowNull: false
    },
    sempadan_selatan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sempadan_timur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sempadan_barat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dasar_penerbitan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_pemohon: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
  }
);

export default SertifikatTanah;