import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/database.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/upload.js";

import { errorHandler } from "./middleware/errorHandler.js";

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// For tests we don't need socket io
app.use("/api/posts", postRoutes(null));

// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(errorHandler);

export default app;