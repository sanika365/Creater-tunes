// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// // import { redirect } from "react-router-dom";
// import { SidebarContext } from "../Context/SidebarContext";
// import { useNavigate } from "react-router-dom";
// import { SongContext } from "../Context/SongContext";
// const UploadSong = () => {
//   const navigate = useNavigate();
//   // we are using this to close the sidebar when we land on this page
//   const { showMenu, setShowMenu } = useContext(SidebarContext);
//   const {__URL__} = useContext(SongContext)
//   useEffect(() => {
//     if (showMenu) setShowMenu(false);
//   }, []);

//   // we are using this to upload the file
//   const [file, setFile] = useState();
//   const [title, setTitle] = useState();
//   const [artist, setArtist] = useState();
//   const [album, setAlbum] = useState();
//   const [description, setDescription] = useState();

//   // we are using this to handle the file change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // we are using this to handle the form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Get token from localStorage (or any other auth storage)
//    // ✅ Correct
// const token = localStorage.getItem("access_token");
   
  
//     if (!token) {
//       alert("You must be logged in to upload a song.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("artist", artist);
//     formData.append("album", album);
//     formData.append("description", description);
//     formData.append("file", file);
  
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer ${token}`, // Use the token here
//       },
//     };
  
//     try {
//       const result = await axios.post(`${__URL__}/api/v1/song/upload`, formData, config);
  
//       if (result.status === 201) {
//         alert("File uploaded successfully");
//         navigate("/explore");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to upload file.");
//     }
//   };
  
//   return (
//     <div className="flex flex-col min-h-screen py-10 text-white px-5 bg-slate-800 space-y-5 pb-10 lg:p-20">
//        <h1 className="text-3xl font-bold text-center lg:text-4xl">Upload Song</h1>

//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className="flex flex-col lg:m-5 text-xl space-y-5"
//       >
//         <div className="flex flex-col space-y-2 lg:px-5">
//           <label className="px-2" htmlFor="title">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             className=" px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md text-gray-900 placeholder:text-gray-350 h-10 outline-none"
//             placeholder="Enter the title name"
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex flex-col space-y-2 lg:px-5">
//           <label className="px-2" htmlFor="title">
//             Description
//           </label>
//           <input
//             type="text"
//             name="title"
//             className=" px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900  h-10 outline-none"
//             placeholder="Enter the description"
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex flex-col space-y-2 lg:px-5">
//           <label className="px-2" htmlFor="title">
//             Artist
//           </label>
//           <input
//             type="text"
//             name="title"
//             className=" px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none"
//             placeholder="Enter the artist name"
//             onChange={(e) => setArtist(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex flex-col space-y-2 lg:px-5">
//           <label className="px-2" htmlFor="title">
//             Cover Album
//           </label>
//           <input
//             type="text"
//             name="title"
//             className=" px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none"
//             placeholder="Enter the album name"
//             onChange={(e) => setAlbum(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col space-y-2 lg:px-5">
//           <label htmlFor="audioFile">Audio File</label>
//           <input
//             onChange={handleFileChange}
//             type="file"
//             name="file"
//             accept="audio/*"
//             required
//           />
//         </div>
//         <button
//           className="bg-[#ffd700] text-[#7d0000] text-sm  py-1 rounded-xl w-32 lg:mx-4"
//           type="submit"
//           disabled={localStorage.getItem("access_token") ? false : true}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadSong;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SidebarContext } from "../Context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";

const UploadSong = () => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { __URL__ } = useContext(SongContext);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [description, setDescription] = useState();
  const [thumbnail, setThumbnail] = useState(); // ✅ added state for thumbnail

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in to upload a song.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail.trim());  // ✅ added thumbnail into formData
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.post(`${__URL__}/api/v1/song/upload`, formData, config);

      if (result.status === 201) {
        alert("File uploaded successfully");
        navigate("/explore");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-10 text-white px-5 bg-slate-800 space-y-5 pb-10 lg:p-20">
      <h1 className="text-3xl font-bold text-center lg:text-4xl">Upload Song</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col lg:m-5 text-xl space-y-5">
        <div className="flex flex-col space-y-2 lg:px-5">
          <label className="px-2">Title</label>
          <input type="text" className="px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md text-gray-900 placeholder:text-gray-350 h-10 outline-none" placeholder="Enter the title name" onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="flex flex-col space-y-2 lg:px-5">
          <label className="px-2">Description</label>
          <input type="text" className="px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none" placeholder="Enter the description" onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="flex flex-col space-y-2 lg:px-5">
          <label className="px-2">Artist</label>
          <input type="text" className="px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none" placeholder="Enter the artist name" onChange={(e) => setArtist(e.target.value)} required />
        </div>

        <div className="flex flex-col space-y-2 lg:px-5">
          <label className="px-2">Album</label>
          <input type="text" className="px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none" placeholder="Enter the album name" onChange={(e) => setAlbum(e.target.value)} required />
        </div>

        {/* ✅ New Thumbnail Input Field */}
        <div className="flex flex-col space-y-2 lg:px-5">
          <label className="px-2">Thumbnail URL</label>
          <input type="text" className="px-5 text-sm bg-slate-100 border-b-blue-200 border-b-2 rounded-md placeholder:text-gray-350 text-gray-900 h-10 outline-none" placeholder="Enter the thumbnail URL" onChange={(e) => setThumbnail(e.target.value)} required />
        </div>

        <div className="flex flex-col space-y-2 lg:px-5">
          <label>Audio File</label>
          <input onChange={handleFileChange} type="file" name="file" accept="audio/*" required />
        </div>

        <button className="bg-[#ffd700] text-[#7d0000] text-sm py-1 rounded-xl w-32 lg:mx-4" type="submit" disabled={!localStorage.getItem("access_token")}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadSong;
