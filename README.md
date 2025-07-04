Music Player Application
It is a small music player web app using the MERN stack (MongoDB, Express, React, Node.js). The app should allow users to sign up, sign in, select songs from a library, create playlists, play songs, and resume songs from where they left off.

Here's a breakdown of the technologies used, functionality, and how to set it up locally:

Technologies Used:
Frontend:

React.js: For building the user interface.
Redux: For state management, especially for managing the state of the music player and user authentication.
Tailwind-CSS: For styling the components and creating a responsive design.
Axios: For making HTTP requests to the backend.
Backend:

Node.js: As the runtime environment for the server-side code.
Express.js: For building the RESTful API that interacts with the frontend.
MongoDB: As the database for storing user data, playlists, and music information.
Mongoose: For object data modeling (ODM) to work with MongoDB.
Authentication:

JWT (JSON Web Tokens): For user authentication, allowing secure login and session management.
Music Management:

Spotify API: For fetching music data, including tracks, albums, and artist information.
Deployment:

For deployment i used render free cloud hosting website.
Functionality:
User Authentication: Users can sign up and log in using JWT-based authentication.
Music Library: Users can browse and search for music tracks and albums using the Spotify API.
Playlist Management: Users can create, view, and manage their playlists.
Music Player: Users can play music, with features like play, pause, skip, and volume control.
Responsive Design: The app is designed to be responsive, working well on both desktop and mobile devices.
How to Set Up Locally:
Clone the Repository:

git clone https://github.com/manni2000/Music-app.git
cd Music-app
Install Dependencies:

Navigate to the frontend directory and install dependencies:
cd frontend
npm install
Navigate to the backend directory and install dependencies:
cd ../backend
npm install
Set Up Environment Variables:

Create a .env file in the backend directory and configure the following environment variables:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Start the Development Server:

Start the backend server:
cd backend
node server
Start the frontend development server:
cd ../frontend
npm start
Access the Application:

Once both servers are running, you can access the application by navigating to http://localhost:1337 in your web browser.
