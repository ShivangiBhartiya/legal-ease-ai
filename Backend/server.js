import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import uploadRoutes from "./routes/uploadRoutes.js";
import waitlistRoutes from "./routes/waitlistRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ─── Routes ──────────────────────────────────────────────────────
app.use("/api", uploadRoutes);
app.use("/api", waitlistRoutes);

// ─── Server ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});