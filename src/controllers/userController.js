import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

// ایجاد JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ username, email, password });
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    image: user.image,
    token: generateToken(user._id),
  });
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Read Profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update Profile (نام، ایمیل، عکس)
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.file) user.image = `/uploads/users/${req.file.filename}`;

  await user.save();
  res.json(user);
});

// Delete User (Admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.remove();
  res.json({ message: "User deleted successfully" });
});
