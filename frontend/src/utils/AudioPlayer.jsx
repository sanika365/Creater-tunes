import React, { useState, useEffect, useRef, useContext } from "react";
import stereo from "../assets/stereo.jpg";
import { SongContext } from "../Context/SongContext";

import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

const AudioPlayer = () => {
  const { song, audio } = useContext(SongContext);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef();

  // 🎧 Secure streaming with token
  useEffect(() => {
    const streamAudio = async () => {
      if (!song?._id) return;
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:1337/api/v1/stream/${song._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to stream audio:", errorText);
          return;
        }
  
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.startsWith("audio/")) {
          console.error("Invalid content type received:", contentType);
          return;
        }
  
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
  
        audio.src = audioUrl;
        audio.load();
        audio.play().catch((err) => {
          console.error("Playback failed:", err);
        });
  
      } catch (err) {
        console.error("Streaming error:", err.message);
      }
    };
  
    streamAudio();
  }, [song?._id]);
  
  // ▶️ Toggle play/pause
  const togglePlayPause = () => {
    if (!audio || !song._id) return;

    if (audio.paused) {
      audio.play().catch((e) => console.error("Play error:", e));
      song.setIsPlaying(true);
    } else {
      audio.pause();
      song.setIsPlaying(false);
    }
  };

  // ⏩ Seek using progress bar
  const handleProgressChange = (e) => {
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  // ⏱️ Format time as mm:ss
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div className="fixed flex justify-between items-center bottom-0 right-0 left-0 bg-gray-900 text-white px-3 lg:px-5 py-2 shadow-xl">
      <div className="flex space-x-5">
        <img src={stereo} alt="Album Art" className="rounded-lg w-12" />
        <div>
          <h3 className="text-lg">{song.songName}</h3>
          <p className="text-sm">{song.songArtist}</p>
        </div>
      </div>

      <div className="flex space-x-3 lg:space-x-5">
        <button>
          <FiSkipBack />
        </button>
        <button onClick={togglePlayPause} disabled={!song._id}>
          {song.isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <button>
          <FiSkipForward />
        </button>
      </div>

      <div className="hidden lg:flex space-x-5 items-center w-1/3">
        <input
          type="range"
          ref={progressBar}
          value={currentTime}
          max={duration}
          onChange={handleProgressChange}
          className="w-full"
          step="any"
        />
        <p className="whitespace-nowrap text-sm">
          {calculateTime(currentTime)}/{calculateTime(duration)}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
