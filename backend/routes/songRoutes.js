// songRoutes.js
import express from "express";
import upload from "../config/upload.js"; // ✅ correct one
import {
  addSong,
  getSongs,
  streamSong,
  deleteSong,
 // uploadSong
} from "../controllers/songController.js";

const router = express.Router();
//import { upload } from "../middlewares/uploadMiddleware.js";
router.post("/song/upload", upload.single("file"), addSong);
router.get("/songs", getSongs);
//router.post("/upload", upload.single("audio"), uploadSong);
router.get("/stream/:id", streamSong);
router.delete("/delete/:id", deleteSong);

export default router;
