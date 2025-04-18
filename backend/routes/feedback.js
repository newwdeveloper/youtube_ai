import express from "express";
import Feedback from "../models/Feedback.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { songId, mood, liked } = req.body;
    const feedback = new Feedback({
      userId: req.user.userId,
      songId,
      mood,
      liked,
    });
    await feedback.save();
    res.json({ message: "Feedback saved" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
