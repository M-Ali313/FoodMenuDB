import express from "express";
import upload from "../middleware/upload.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, admin } from "../middleware/auth.js";
import {
  createFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

// CRUD routes
router.post("/", protect, admin, upload.single("image"), asyncHandler(createFood));
router.get("/", asyncHandler(getFoods));
router.get("/:id", asyncHandler(getFood));
router.put("/:id", protect, admin, upload.single("image"), asyncHandler(updateFood));
router.delete("/:id", protect, admin, asyncHandler(deleteFood));

export default router;
