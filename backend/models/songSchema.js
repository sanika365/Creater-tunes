import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "uploads.files", // GridFS collection
    },
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
