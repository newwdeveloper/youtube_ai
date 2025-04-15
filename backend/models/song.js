import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  songId: { type: String, required: true, unique: true },
  title: String,
  artist: String,
  genre: String,
  moodTags: [String],
  youtubeUrl: { type: String },
});

export default mongoose.model("Songs", songSchema);
