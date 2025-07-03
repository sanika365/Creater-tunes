import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { connectToMongo } from "../db.js";

import User from "../models/userSchema.js";
// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if any of the fields are empty
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Connect to MongoDB before querying
    await connectToMongo();

    // Check if user exists in the database using Mongoose User model
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    // Check if the provided password matches the stored hashed password
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: "User logged in",
        status: "success",
        token: generateToken(user._id), // Generate JWT token for the user
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
};

// Generate JWT for the user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};




// @desc: Register a new user
// @route: POST /api/v1/auth/register
// @access: Public
export const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // To check if body is coming correctly
    const { fullName, email, password } = req.body;

    // if any of the fields are empty
    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Connect to MongoDB (this will ensure the connection is established before using models)
    await connectToMongo();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      playlists: [], // Make sure you are using the correct field name 'playlists'
    });

    await user.save(); // Save the new user to the database

    res.status(201).json({
      message: "User registered",
      status: "success",
    });
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
  }
};

