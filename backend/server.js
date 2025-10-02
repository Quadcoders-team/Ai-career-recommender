import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import skillsRoutes from "./routes/skills.js";
import recommendRoutes from "./routes/recommend.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/recommend", recommendRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
