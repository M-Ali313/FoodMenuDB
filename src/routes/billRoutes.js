import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, admin } from "../middleware/auth.js";
import {
  createBill,
  getBills,
  getBill,
  updateBill,
  deleteBill,
  generateBillPDF,
} from "../controllers/billController.js";

const router = express.Router();

// CRUD + PDF
router.post("/", protect, asyncHandler(createBill));
router.get("/", protect, admin, asyncHandler(getBills));
router.get("/:id", protect, asyncHandler(getBill));
router.put("/:id", protect, admin, asyncHandler(updateBill));
router.delete("/:id", protect, admin, asyncHandler(deleteBill));
router.get("/:id/pdf", protect, asyncHandler(generateBillPDF));

export default router;
