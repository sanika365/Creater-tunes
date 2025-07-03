import express from 'express'
import {
  addPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getPlaylists,
  getSongsInPlaylist,
} from "../controllers/playlistController.js";
const router = express.Router();

router.get("/", getPlaylists); //get all playlists
router.get("/songs/:id", getSongsInPlaylist);// get all song in playlist
router.post('/create', addPlaylist); //add new playlist
router.delete('/delete/:id', deletePlaylist); //delete a playlist
router.post('/add/:id', addSongToPlaylist); //add song to playlist
router.delete('/remove/:id', removeSongFromPlaylist); //remove song from playlist

export default router;