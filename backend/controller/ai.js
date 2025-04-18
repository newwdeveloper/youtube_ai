import synaptic from "synaptic";
import Feedback from "../models/Feedback.js";
import Song from "../models/song.js";

const { Layer, Network, Trainer } = synaptic;

// Train AI function for personalized song recommendations
const trainAI = async (userId) => {
  try {
    // 1️⃣ Fetch data from MongoDB
    const feedback = await Feedback.find({ userId });
    const songs = await Song.find();

    // Validate data
    if (!feedback.length || !songs.length) {
      console.warn(`No feedback or songs found for user ${userId}`);
      return null;
    }

    // 2️⃣ Collect unique moods and genres
    const moodSet = new Set();
    const genreSet = new Set();
    const songMap = new Map(songs.map((song) => [song.songId, song])); // Optimize lookups

    feedback.forEach((fb) => {
      moodSet.add(fb.mood);
      const song = songMap.get(fb.songId);
      if (song && song.genre) {
        genreSet.add(song.genre);
      }
    });

    const moodList = Array.from(moodSet);
    const genreList = Array.from(genreSet);

    // Validate mood and genre lists
    if (moodList.length < 2 || genreList.length < 2) {
      console.warn("Insufficient unique moods or genres for training");
      return null;
    }

    // 3️⃣ Build training data
    const trainingData = feedback
      .map((fb) => {
        const song = songMap.get(fb.songId);
        if (!song || !song.genre) return null; // Skip invalid entries

        const moodIndex = moodList.indexOf(fb.mood);
        const genreIndex = genreList.indexOf(song.genre);

        const input = [
          moodIndex / (moodList.length - 1), // Normalize to 0-1
          genreIndex / (genreList.length - 1),
        ];

        const output = [fb.liked ? 1 : 0]; // Single output for binary classification
        return { input, output };
      })
      .filter(Boolean); // Remove null entries

    // Check for sufficient training data
    if (trainingData.length === 0) {
      console.warn("No valid training data after filtering");
      return null;
    }

    // 4️⃣ Define the neural network
    const inputLayer = new Layer(2); // 2 inputs: mood, genre
    const hiddenLayer = new Layer(10); // Increased to 10 neurons for better learning
    const outputLayer = new Layer(1); // Single output: likelihood of liking song

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    const myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer,
    });

    // 5️⃣ Train the network
    const trainer = new Trainer(myNetwork);
    trainer.train(trainingData, {
      rate: (error, iteration) => Math.max(0.01, 0.1 / (1 + iteration / 1000)), // Dynamic learning rate
      iterations: 20000, // Increased for better convergence
      error: 0.01, // Realistic error threshold
      shuffle: true,
      log: true, // Enable logging for debugging
    });

    // 6️⃣ Return trained network and song IDs
    return {
      network: myNetwork.toJSON(), // Serialize network for storage
      songIds: songs.map((s) => s.songId), // For mapping predictions to songs
    };
  } catch (error) {
    console.error(`Error training AI for user ${userId}:`, error);
    return null;
  }
};

export default trainAI;
