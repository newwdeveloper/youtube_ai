import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: String,
  songId: String,
  mood: String,
  liked: Boolean,
});

export default mongoose.model("Feedback", feedbackSchema);
