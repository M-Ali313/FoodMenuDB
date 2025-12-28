import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import billRoutes from "./routes/billRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* =======================
   ES Modules dirname fix
======================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =======================
   Global Middlewares
======================= */

// ⭐ CORS مناسب Expo + Postman
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   Static uploads
======================= */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* =======================
   Health Check (خیلی مهم)
======================= */
app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running successfully 🚀",
  });
});

/* =======================
   API Routes
======================= */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bills", billRoutes);

/* =======================
   Multer Error Handler
======================= */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Image size must be less than 2MB",
      });
    }
  }

  next(err);
});

/* =======================
   404 Handler
======================= */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* =======================
   Global Error Handler
======================= */
app.use(errorHandler);

export default app;
