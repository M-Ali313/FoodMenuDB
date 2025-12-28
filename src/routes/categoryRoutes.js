import express from "express";
import upload from "../middleware/upload.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, admin } from "../middleware/auth.js";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), asyncHandler(createCategory));
router.get("/", asyncHandler(getCategories));
router.get("/:id", asyncHandler(getCategory));
router.put("/:id", protect, admin, upload.single("image"), asyncHandler(updateCategory));
router.delete("/:id", protect, admin, asyncHandler(deleteCategory));

export default router;
