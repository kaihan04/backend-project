// routes/PendaftaranTanahRoutes.js
import express from "express";
import {
  buatPendaftaranTanah,
  dapatkanSemuaPendaftaran,
  dapatkanPendaftaranById,
  updatePendaftaran,
  hapusPendaftaran,
  cariPendaftaran,
  dapatkanPendaftaranTerbaru,
} from "../controllers/PendaftaranTanah.js";

import {
    buatSertifikat,
    dapatkanSemuaSertifikat,
    dapatkanSertifikatById,
    updateSertifikat,
    hapusSertifikat,
    cariSertifikat,
} from "../controllers/SertifikatTanah.js";
import {
    buatEntriBuku,
    dapatkanSemuaEntri,
    dapatkanEntriById,
    perbaruiEntri,
    hapusEntri,
    cariEntri,
} from "../controllers/BukuSporadik.js";
const router = express.Router();

// Rute CRUD dasar
router.post("/pendaftaran-tanah", buatPendaftaranTanah);
router.get("/pendaftaran-tanah", dapatkanSemuaPendaftaran);
router.get("/pendaftaran-tanah/terbaru", dapatkanPendaftaranTerbaru);
router.get("/pendaftaran-tanah/:id", dapatkanPendaftaranById);
router.put("/pendaftaran-tanah/:id", updatePendaftaran);
router.delete("/pendaftaran-tanah/:id", hapusPendaftaran);

// Rute pencarian
router.get("/cari-pendaftaran", cariPendaftaran);
// Rute CRUD untuk Sertifikat Tanah
router.post('/sertifikat-tanah', buatSertifikat);
router.get('/sertifikat-tanah', dapatkanSemuaSertifikat);
router.get('/sertifikat-tanah/:id', dapatkanSertifikatById);
router.put('/sertifikat-tanah/:id', updateSertifikat);
router.delete('/sertifikat-tanah/:id', hapusSertifikat);

// Rute pencarian
router.get('/cari-sertifikat', cariSertifikat);
// Rute CRUD dasar
router.post('/buku-sporadik', buatEntriBuku);
router.get('/buku-sporadik', dapatkanSemuaEntri);
router.get('/buku-sporadik/:id', dapatkanEntriById);
router.put('/buku-sporadik/:id', perbaruiEntri);
router.delete('/buku-sporadik/:id', hapusEntri);

// Rute pencarian
router.get('/cari-entri', cariEntri);


export default router;