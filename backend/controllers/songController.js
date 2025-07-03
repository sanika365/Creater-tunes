import { connectToMongo, getDB } from "../db.js";
import fs from "fs";
import path from "path";
import mongodb from "mongodb";
import { ObjectId } from "mongodb";
import User from "../models/songSchema.js";
export const addSong = async (req, res) => {
  try {
    const { title, artist, album, description, thumbnail } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    await connectToMongo();
    const db = getDB();
    const collection = db.collection("songs");

    const newSong = {
      title,
      artist,
      album,
      description,
      thumbnail,
      filePath: file.path, // local path
      originalName: file.originalname,
      uploadedBy: req.userId,
    };

    await collection.insertOne(newSong);

    return res.status(201).json({ message: "Song uploaded", song: newSong });
  } catch (error) {
    console.error("Error in addSong:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};




//@desc   Delete a song
//@route  DELETE /api/v1/song/delete/:id
//@access Private


export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    await connectToMongo();
    const db = getDB();
    const collection = db.collection("songs");

    const song = await collection.findOne({ _id: new ObjectId(id) });

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    // Optional: Check if the logged-in user is the uploader
    if (song.uploadedBy.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Delete song file from local storage if necessary
    if (fs.existsSync(song.filePath)) {
      fs.unlinkSync(song.filePath); // Remove file
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSong:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
// @desc    Get all songs
// @route   GET /api/v1/songs
// @access  Public
export const getSongs = async (req, res) => {
  try {
    await connectToMongo(); // Connect first
    const db = getDB(); // Get DB instance
    const collection = db.collection("songs");
   // if you don't exclude fields

    const songs = await collection.find({}).toArray();

    if (songs.length === 0) {
      return res.status(404).json({ error: "No songs found" });
    }

    return res.status(200).json({ songs });
  } catch (error) {
    console.error("Error in getSongs:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
// uploadController.js


export const uploadSong = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("songs");

    const filePath = req.file.filename; // already includes extension
    const title = req.body.title || "Untitled";

    const result = await collection.insertOne({
      title,
      filePath, // e.g., 123abc.mp3
      uploadedAt: new Date(),
    });

    res.status(200).json({ message: "Song uploaded", songId: result.insertedId });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Failed to upload" });
  }
};

// @desc: Stream a song
// http://localhost:1337/api/v1/stream/3178579b71e6ebc526cf0d360eca8401
// @access  Public

// @route GET /api/v1/stream/:filename

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const streamSong = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Streaming song ID:", id);

    const db = getDB();
    const collection = db.collection("songs");

    const song = await collection.findOne({ _id: new ObjectId(id) });
    console.log("Fetched song from DB:", song);

    if (!song) return res.status(404).json({ error: "Song not found" });
    
    const relativePath = song.filePath.replace(/^uploads[\\/]/, "");
    const filePath = path.resolve(__dirname, "../uploads", relativePath);
 
    console.log("Resolved file path:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Audio file not found on disk" });
    }

    const readStream = fs.createReadStream(filePath);
    res.setHeader("Content-Type", "audio/mpeg");
    readStream.pipe(res);
  } catch (error) {
    console.error("Stream error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    List all GridFS files
// @route   GET /api/v1/song/files
// @access  Public
export const listGridFSFiles = async (req, res) => {
  try {
    await connectToMongo(); // Reuse your Mongo connection utility
    const db = getDB();
    const bucket = new mongodb.GridFSBucket(db, { bucketName: "uploads" });

    const files = await bucket.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found in GridFS" });
    }

    return res.status(200).json({ files });
  } catch (error) {
    console.error("Error listing files:", error.message);
    return res.status(500).json({ error: "Server error while listing files" });
  }
};