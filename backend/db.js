// import mongoose from "mongoose";
// // import dotenv from "dotenv";

// // dotenv.config();
// // Define your MongoDB URI here (or in a .env file)
// const mongoURI =
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spotify-clone";

// // MongoDB connection function
// const connectToMongo = async () => {
//   try {
//     // Establish connection to MongoDB
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // If successful
//     console.log("MongoDB database connection established successfully");
//   } catch (error) {
//     // Log any error and exit
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1); // Optional: To stop server if DB connection fails
//   }
// };

// // Default export: the connection function
// export default connectToMongo;
// db.js
 import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spotify-clone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  return mongoose.connection.db;
};

export { connectToMongo, getDB };
