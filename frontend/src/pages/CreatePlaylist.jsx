import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";

// Importing Contexts
import { SidebarContext } from "../Context/SidebarContext"; // ✅ Fixed typo
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";

// Optional: only import if used
// import { QueueContext } from "../Context/QueueContext";

import { GrFormAdd } from "react-icons/gr";

const CreatePlaylist = () => {
  const { fetchPlaylist } = useContext(FetchContext);
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { __URL__ } = useContext(SongContext);
  // const { list } = useContext(QueueContext); // Not used, removed for clarity

  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Create playlist handler
  const handleCreatePlaylist = async () => {
    if (!token) return alert("Please login to create a playlist");
    if (playlistName.trim() === "") return alert("Please enter a playlist name");

    setLoading(true);
    try {
      const { status } = await axios.post(
        `${__URL__}/api/v1/playlist/create`,
        { playlistName },
        { headers }
      );

      if (status === 200 || status === 201) {
        alert("Playlist created successfully");
        setCreatePlaylistOpen(false);
        setPlaylistName("");
        fetchPlaylists();
      }
    } catch (err) {
      console.error("Error creating playlist:", err.response?.data || err.message);
      alert("Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  // Fetch playlists from backend
  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${__URL__}/api/v1/playlist`, { headers });
      setPlaylists(data.playlists);
    } catch (err) {
      console.error("Error fetching playlists:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // On mount
  useEffect(() => {
    if (showMenu) setShowMenu(false);
    fetchPlaylists();
  }, []);

  return (
    <div className="bg-slate-800 text-teal-200 flex flex-col p-5 space-y-10 min-h-screen pb-32">
      <p className="text-2xl">All Playlists</p>

      {/* Playlist Cards */}
      {loading ? (
        <div>Loading...</div>
      ) : playlists.length > 0 ? (
        playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlistName={playlist.playlistName}
            playlistId={playlist._id}
            noSongs={playlist.songs.length}
          />
        ))
      ) : (
        <div className="flex justify-center items-center text-2xl">
          No Playlists Found
        </div>
      )}

      {/* Create Playlist Floating Button */}
      <div
        onClick={() => setCreatePlaylistOpen(true)}
        className="bg-[#ffd700] fixed rounded-xl px-2 text-lg bottom-20 right-5 flex justify-center items-center space-x-1 cursor-pointer"
      >
        <GrFormAdd />
        <span className="text-gray-900">Create Playlist</span>
      </div>

      {/* Create Playlist Modal */}
      {createPlaylistOpen && (
        <div className="bg-gray-900 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-white p-10 flex flex-col justify-center items-center space-y-5 rounded-xl relative">
            <button
              onClick={() => setCreatePlaylistOpen(false)}
              className="absolute top-2 right-5 text-black"
            >
              Close
            </button>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              className="w-3/4 h-10 outline-none border-b-black text-gray-900 border-b-[1px]"
            />
            <button
              onClick={handleCreatePlaylist}
              className="bg-[#ffd700] px-5 py-1 rounded-md lg:rounded-xl shadow-lg text-[#7d0000] text-sm"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;
