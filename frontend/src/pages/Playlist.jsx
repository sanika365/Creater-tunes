import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import PlaylistSong from "../components/PlaylistSong";
import { MdDeleteForever } from "react-icons/md";

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playList, setPlayList] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchPlaylist } = useContext(FetchContext);
  const { __URL__ } = useContext(SongContext);

  // 1️⃣ Pull the token
  const token = localStorage.getItem("access_token");

  // 2️⃣ Build headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  // Delete playlist
  const deletePlaylist = async () => {
    setLoading(true);
    try {
      const { status } = await axios.delete(
        `${__URL__}/api/v1/playlist/${id}`,
        { headers }
      );
      if (status === 200) {
        alert("Playlist deleted successfully");
        navigate("/playlists");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      deletePlaylist();
    }
  };

  // Get one playlist
  const getPlaylist = async () => {
    try {
      const { data } = await axios.get(
        `${__URL__}/api/v1/playlist/${id}`,
        { headers }
      );
      setPlayList(data.playlist);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Fetch failed");
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [fetchPlaylist]);

  if (loading || !playList) return <div>Loading...</div>;

  return (
    <div className="bg-slate-800 text-white p-5 min-h-screen space-y-5 flex flex-col lg:items-center">
      <div className="lg:mt-10 flex justify-between items-center px-1 lg:w-[70vw]">
        <div>
          <h2 className="text-xl lg:text-4xl">{playList.playlistName}</h2>
          <p className="text-md lg:text-lg">Songs - {playList.songs.length}</p>
        </div>
        <button onClick={handleDelete}>
          <MdDeleteForever size={25} />
        </button>
      </div>

      <div className="space-y-2">
        {playList.songs.length === 0 ? (
          <div>No songs in this playlist</div>
        ) : (
          playList.songs.map((song, idx) => (
            <PlaylistSong
              key={song._id}
              title={song.title}
              artistName={song.artistName}
              songSrc={song.filePath}  // or however you pass stream URL
              playlistId={id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Playlist;
