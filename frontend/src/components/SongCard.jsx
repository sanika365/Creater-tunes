// SongCard.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";

import { SongContext } from "../Context/SongContext";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";

import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline, MdOutlinePlaylistAdd, MdQueuePlayNext } from "react-icons/md";
import musicbg from "../assets/musicbg.jpg";

const SongCard = ({ title, artistName, songSrc, userId, songId, file, thumbnail }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchSong } = useContext(FetchContext);
  const { dispatchQueue, dispatchList } = useContext(QueueContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const decoded = token ? decodeToken(token) : null;
  const [showOptions, setShowOptions] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handlePlay = () => {
    const streamUrl = `${__URL__}/api/v1/stream/${songSrc}`;
    song.setSongName(title);
    song.setArtistName(artistName);
    song.setSongUrl(streamUrl);
    audio.src = streamUrl;
    audio.load();
    audio.play();
    song.setIsPlaying(true);
  };
  console.log("songSrc", songSrc);
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this song?");
    if (!confirmed) return;

    try {
      const { status } = await axios.delete(`${__URL__}/api/v1/song/delete/${songId}?file=${file}`, {
        headers,
      });
      if (status === 200) setFetchSong((prev) => !prev);
    } catch (err) {
      console.error("Error deleting song:", err);
    }
  };

  const handleAddToPlaylist = () => {
    dispatchList({ type: "ADD_SONG", payload: { title, artistName, songSrc } });
    navigate("/playlists");
  };

  const handlePlayNext = () => {
    dispatchQueue({ type: "ADD_TO_QUEUE", payload: { title, artistName, songSrc } });
  };

  const toggleOptions = () => setShowOptions((prev) => !prev);

  return (
    <div className="flex relative bg-gray-800 text-white justify-between items-center border-b-[1px] p-2 lg:w-[70vw] mx-auto">
      {/* Song Info and Playback */}
      <div onClick={handlePlay} className="flex space-x-5 cursor-pointer">
        <img
          src={thumbnail || musicbg}
          alt={title}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="text-sm lg:text-lg">
          <div>{title}</div>
          <div>{artistName}</div>
        </div>
      </div>

      {/* Desktop Options */}
      <div className="hidden lg:flex justify-start items-center p-2 space-x-5">
        <button onClick={handleAddToPlaylist}>
          <MdOutlinePlaylistAdd size={30} />
        </button>
        <button onClick={handlePlayNext}>
          <MdQueuePlayNext size={25} />
        </button>
        {decoded?.id === userId && (
          <button onClick={handleDelete}>
            <MdDeleteOutline size={25} />
          </button>
        )}
      </div>

      {/* Mobile Options Toggle */}
      <div onClick={toggleOptions} className="relative block lg:hidden">
        <SlOptionsVertical size={15} />
      </div>

      {/* Mobile Options Menu */}
      {showOptions && (
        <div className="absolute right-0 z-10 w-36 bg-gray-900 rounded shadow-md p-2">
          <ul className="flex flex-col space-y-2 text-left">
            <li>
              <button onClick={handleAddToPlaylist}>Add to playlist</button>
            </li>
            <li>
              <button onClick={handlePlayNext}>Play next</button>
            </li>
            {decoded?.id === userId && (
              <li>
                <button onClick={handleDelete}>Delete</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongCard;
