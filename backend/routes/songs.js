import express from "express";
import pkg from "synaptic"; // Import the whole package
const { Network } = pkg; // Extract Network from the package
import { readFileSync, writeFileSync } from "fs";
import Song from "../models/song.js";
import Feedback from "../models/Feedback.js";
import trainAI from "../controller/ai.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/recommend", auth, async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user.userId;

    console.log(`recommend: userId=${userId}, mood=${mood}`);

    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    // Load or train model
    let modelData;
    const modelPath = `./models/${userId}.json`;
    try {
      const modelJson = JSON.parse(readFileSync(modelPath, "utf8"));
      modelData = {
        network: modelJson,
        songIds: (await Song.find()).map((s) => s.songId),
      };
      console.log(`recommend: Loaded model for user ${userId}`);
    } catch (error) {
      console.log(`recommend: Training new model for user ${userId}`);
      modelData = await trainAI(userId);
      if (!modelData) {
        return res.status(400).json({ error: "AI model not available" });
      }
      writeFileSync(modelPath, JSON.stringify(modelData.network), "utf8");
      console.log(`recommend: Saved model for user ${userId}`);
    }

    const net = Network.fromJSON(modelData.network);

    // Fetch songs and compute mood/genre lists
    const songs = await Song.find();
    const feedback = await Feedback.find({ userId });
    const moodList = [...new Set(feedback.map((fb) => fb.mood))];
    const genreList = [
      ...new Set(songs.map((song) => song.genre).filter(Boolean)),
    ];

    console.log(
      `recommend: Feedback count=${feedback.length}, Songs count=${songs.length}`
    );
    console.log(
      `recommend: moodList=${JSON.stringify(
        moodList
      )}, genreList=${JSON.stringify(genreList)}`
    );

    // Validate data
    if (moodList.length < 2 || genreList.length < 2) {
      return res.status(400).json({ error: "Insufficient mood or genre data" });
    }

    const moodIndex = moodList.indexOf(mood);
    if (moodIndex === -1) {
      return res.status(400).json({ error: "Unknown mood" });
    }

    // Generate recommendations
    const recommendations = songs
      .map((song) => {
        const genreIndex = genreList.indexOf(song.genre);
        if (genreIndex === -1) return null;

        const input = [
          moodIndex / (moodList.length - 1),
          genreIndex / (genreList.length - 1),
        ];
        const output = net.activate(input);
        return {
          songId: song.songId,
          title: song.title,
          artist: song.artist,
          youtubeUrl: song.youtubeUrl,
          genre: song.genre,
          score: output[0], // Single output
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    console.log(
      `recommend: Recommendations count=${
        recommendations.length
      }, scores=${recommendations.map((r) => r.score)}`
    );

    // Fallback if no good recommendations
    if (recommendations.every((r) => r.score < 0.1)) {
      const fallback = (await Song.find({ moodTags: mood }).limit(5)).map(
        (song) => ({
          songId: song.songId,
          title: song.title,
          artist: song.artist,
          youtubeUrl: song.youtubeUrl,
          genre: song.genre,
          score: 0,
        })
      );
      console.log(`recommend: Using fallback, count=${fallback.length}`);
      return res.json(fallback);
    }

    res.json(recommendations);
  } catch (error) {
    console.error(`Recommendation error for user ${req.user.userId}:`, error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
