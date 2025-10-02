import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Update or Add Skills
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true }
    );

    res.json({ message: "Skills updated", skills: user.skills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Skills
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ skills: user.skills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
