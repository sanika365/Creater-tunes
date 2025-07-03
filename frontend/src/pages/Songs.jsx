import React, { useEffect, useState, useContext } from "react"; 
import axios from "axios";
import SongCard from "../components/SongCard";
import { SidebarContext } from "../Context/SidebarContext";
import { FetchContext } from "../Context/FetchContext";
import { SongContext } from "../Context/SongContext";
import { QueueContext } from "../Context/QueueContex";

const Songs = () => {
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { fetchSong } = useContext(FetchContext);
  const { queue, list } = useContext(QueueContext);
  const { __URL__ } = useContext(SongContext);

  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (showMenu) setShowMenu(false);

    const fetchSongs = async () => {
      const token = localStorage.getItem('access_token');
      console.log('Token:', token);
      try {
        setLoading(true);
      
        
         // must be set at login
        const { data } = await axios.get(`${__URL__}/api/v1/songs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Full API response:", data);
        console.log("Songs value: ", data.songs, Array.isArray(data.songs));

        setSongs(data.songs);
      } catch (err) {
        console.error("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs(); // ✅ You forgot to actually call it!
  }, [fetchSong]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
   

    <div onClick={closeMenu} className="bg-gray-900 p-5 space-y-2 min-h-screen">
      {loading ? (
    
        <div>Loading...</div>
      ) : songs.length > 0 ? (
        songs.map((song) => (
          <SongCard
    key={song._id}
    title={song.title}
    artistName={song.artistName}
    songSrc={song._id} // or song.file._id if that’s what your backend expects
    songId={song._id}
    userId={song.userId}
    file={song.file}
    thumbnail={song.thumbnail}
  />
        ))
      ) : (
        <div>No songs found.</div>
      )}
    </div>
  );
};

export default Songs;
