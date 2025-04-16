import express from "express";
import Song from "./../models/song.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: "Mood is required." });
  }

  try {
    const songs = await Song.find({ moodTags: mood }).limit(5);

    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "No songs found for this mood." });
    }

    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
