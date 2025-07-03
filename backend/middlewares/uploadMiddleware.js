// uploadMiddleware.js
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("upload")); // folder to store uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get .mp3, .wav, etc.
    const uniqueName = uuidv4() + ext;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
