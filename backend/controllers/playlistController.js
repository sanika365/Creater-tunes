

// @desc   add new playlist
// @route  POST /api/v1/playlist/create
// @access Private
import Playlist from "../models/playlistModel.js";

export const addPlaylist = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER ID:", req.userId);

    const newPlaylist = new Playlist({
      playlistName: req.body.playlistName,
      createdBy: req.userId,
      songs: [],
    });

    const savedPlaylist = await newPlaylist.save();

    return res
      .status(200)
      .json({
        message: "Playlist added successfully",
        status: "success",
        playlist: savedPlaylist,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};


// @desc   Delete a playlist
// @route  DELETE /api/v1/playlist/delete/:id
// @access Private
import mongodb from "mongodb";
import { getDB } from "../db.js"; // ✅ correctly import getDB

export const deletePlaylist = async (req, res) => {
  try {
    const db = getDB(); // ✅ get the native DB object
    const collection = db.collection("playlists");

    const result = await collection.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });

    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Playlist deleted successfully", status: "success" });
    } else {
      throw new Error("Error deleting playlist");
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: "error" });
  }
};


// @desc   Add song to playlist
// @route  POST /api/v1/playlist/add/:id
// @access Private
// import Playlist from "../models/playlistModel.js";

import mongoose from "mongoose";

import Song from "../models/songSchema.js"; // if not already imported, import Song model too

export const addSongToPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { songId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res
        .status(400)
        .json({ message: "Invalid songId", status: "error" });
    }

    const songExists = await Song.findById(songId);
    if (!songExists) {
      return res
        .status(404)
        .json({ message: "Song not found", status: "error" });
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $push: { songs: songId } },
      { new: true }
    ).populate("songs");

    if (!updatedPlaylist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", status: "error" });
    }

    return res.status(200).json({
      message: "Song added successfully to playlist",
      status: "success",
      playlist: updatedPlaylist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};

// @desc   Remove song from playlist
// @route  DELETE /api/v1/playlist/remove/:id
// @access Private

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { songId } = req.body;

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { songs: songId } },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", status: "error" });
    }

    return res.status(200).json({
      message: "Song removed from playlist",
      status: "success",
      playlist: updatedPlaylist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};

// @desc   Get all playlists
// @route  GET /api/v1/playlist/
// @access Private
export const getPlaylists = async (req, res) => {
  try {
    // Fetch playlists created by this user
    const playlists = await Playlist.find({ createdBy: req.userId })
      .populate("songs") // optional: populate song details
      .sort({ createdAt: -1 }); // optional: newest first

    if (!playlists || playlists.length === 0) {
      return res
        .status(404)
        .json({ message: "No playlists found", status: "error" });
    }

    res.status(200).json({ playlists, status: "success" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};



export const getSongsInPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;

    // Validate playlist id
    if (!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)) {
      return res
        .status(400)
        .json({ message: "Invalid playlist ID", status: "error" });
    }

    // Fetch playlist and populate songs
    const playlist = await Playlist.findById(playlistId).populate("songs");

    if (!playlist) {
      return res
        .status(404)
        .json({ message: "Playlist not found", status: "error" });
    }

    res
      .status(200)
      .json({
        playlistName: playlist.playlistName,
        songs: playlist.songs,
        status: "success",
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message, status: "error" });
  }
};
