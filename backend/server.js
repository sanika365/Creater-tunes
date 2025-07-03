import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Importing routes
import songRoutes from "./routes/songRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import playlistRoutes from "./routes/playlistRoutes.js";
import { getSongs, streamSong } from "./controllers/songController.js";
import { userJwtMiddleware } from "./middlewares/authMiddleware.js";
import { connectToMongo } from "./db.js";

// Load environment variables (must be FIRST before using process.env)
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
await connectToMongo(); // ✅ Just call connectToMongo(), no mongoose.connect() here

// Middleware
app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:1337", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "bearer-token"],
  })
);
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), "public")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);
app.get("/api/v1/songs", getSongs);

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// Start the server
app.listen(1337, () => {
  console.log(`Server is running at http://localhost:1337`);
});
