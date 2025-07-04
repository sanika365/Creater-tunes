# 🎧 CreatorTunes

A fullstack audio platform built for independent creators to upload, manage, and stream their music — inspired by Spotify, built with React, Node.js, and MongoDB.

![CreatorTunes Banner](https://private-user-images.githubusercontent.com/91480902/361145642-8f855e54-56d0-4917-b957-6b0387f50695.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTE2MjY1ODEsIm5iZiI6MTc1MTYyNjI4MSwicGF0aCI6Ii85MTQ4MDkwMi8zNjExNDU2NDItOGY4NTVlNTQtNTZkMC00OTE3LWI5NTctNmIwMzg3ZjUwNjk1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzA0VDEwNTEyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg3NTZlMDcwY2VhODM2MzU0M2EyNjI3OTdlNTVkNmUyMjZmOGE1MDJmNTFjYWUwYWE3MDY1ZWJhZmUwNDUzOTYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.isiCfgGxle64i_WDoB3YvCfWui4i5KB1zi0SEFbtxHQ)

---

## 🚀 Live Demo
[👉 View the Project](https://regal-naiad-ac5dda.netlify.app/)

---


## 🧩 Features

### 🔐 **Authentication**
- Register / Login using secure JWT-based auth
- Role-based access (Creator vs Listener)

### 🎵 **Upload Songs**
- Users can upload songs & thumbnails directly from their device
- Local file picker UI with validation

### 🎧 **Audio Player**
- Integrated player with playback controls
- Stream songs with real-time updates

### 📁 **Playlists**
- Create & manage custom playlists
- Add/remove tracks

### 💻 **Responsive Design**
- Works smoothly on desktop and mobile devices

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Misc |
|----------|---------|----------|------|
| React.js | Node.js + Express | MongoDB | Tailwind CSS, JWT |
| React Router | REST API | Mongoose | Vite / CRA |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/sanika365/CreatorTunes.git
cd CreatorTunes

# Install frontend
cd frontend
npm install
npm run dev

# Install backend
cd ../backend
npm install
npm run start

