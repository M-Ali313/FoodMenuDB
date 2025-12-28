import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import upload from "../middleware/upload.js";
import { protect, admin } from "../middleware/auth.js";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Auth
router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

// Profile
router.get("/profile", protect, asyncHandler(getProfile));
router.put("/profile", protect, upload.single("image"), asyncHandler(updateProfile));

// Admin actions
router.delete("/:id", protect, admin, asyncHandler(deleteUser));

export default router;
