import express from "express";
import axios from "axios";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const skills = user.skills || [];

    // Call Python API
    const response = await axios.post("http://127.0.0.1:5001/recommend", { skills });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
});

export default router;
