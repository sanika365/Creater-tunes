import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextState = ({ children }) => {
  const [songUrl, setSongUrl] = useState("");
  const [songName, setSongName] = useState("");
  const [songArtist, setArtistName] = useState("");
  const [songAlbum, setAlbumName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  let __URL__;
  if (document.domain === "localhost") {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "https://music-player-app-backend-yq0c.onrender.com";
  }

  const audio = new Audio();

  return (
    <SongContext.Provider
      value={{
        audio,
        song: {
          songUrl,
          songName,
          songArtist,
          songAlbum,
          isPlaying,
          setSongUrl,
          setSongName,
          setArtistName,
          setAlbumName,
          setIsPlaying,
        },
        __URL__,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
