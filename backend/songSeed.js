import mongoose from "mongoose";
import Songs from "./models/song.js";
import dotenv from "dotenv";

dotenv.config();

async function seedSongs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    await Songs.deleteMany({});
    await Songs.insertMany([
      {
        songId: "song1",
        title: "Tum Tak",
        artist: "Javed Ali, Keerthi Sagathia & Pooja AV",
        genre: "bollywood",
        moodTags: ["happy", "love"],
        youtubeUrl: "https://youtu.be/k09uvR5eUao?si=lZ22ZaOOqW1YMeTj",
      },
      {
        songId: "song2",
        title: "Tu Abhaal",
        artist: "Javed Ali & Ravindra Khomne",
        genre: "marathi",
        moodTags: ["motivation", "energetic"],
        youtubeUrl: "https://youtu.be/k09uvR5eUao?si=JMFFWbR7mIn72VUD",
      },
      {
        songId: "song3",
        title: "Taare Zameen Par",
        artist: "Shankar Mahadevan, Bugs Bhargava, Vivinenne Pocha",
        genre: "bollywood",
        moodTags: ["feel good", "energetic"],
        youtubeUrl: "https://youtu.be/kaMB6Rw8XzA?si=eazV3rZkxQj3Xibi",
      },
      {
        songId: "song4",
        title: "Kun Faya Kun",
        artist: "A.R. Rahman, Javed Ali, Mohit Chauhan",
        genre: "bollywood",
        moodTags: ["spiritual", "peaceful"],
        youtubeUrl: "https://youtu.be/T94PHkuydcw?si=vD65Ftu6TyHKa_Oj",
      },
      {
        songId: "song5",
        title: "Zinda",
        artist: "Siddharth Mahadevan",
        genre: "bollywood",
        moodTags: ["motivational", "intense"],
        youtubeUrl: "https://youtu.be/RlD2hHq7iYk?si=7IVLBvPj2ocqE_x2",
      },
      {
        songId: "song6",
        title: "Agar Tum Saath Ho",
        artist: "Alka Yagnik, Arijit Singh",
        genre: "bollywood",
        moodTags: ["emotional", "love"],
        youtubeUrl: "https://youtu.be/sK7riqg2mr4?si=q0zF1cbkhXYmj2Vh",
      },
      {
        songId: "song7",
        title: "Namo Namo",
        artist: "Amit Trivedi",
        genre: "bollywood",
        moodTags: ["devotional", "energetic"],
        youtubeUrl: "https://youtu.be/sxhtX0d8f_M?si=cgh8Tx6zRce3z_1j",
      },
      {
        songId: "song8",
        title: "Kho Gaye Hum Kahan",
        artist: "Jasleen Royal, Prateek Kuhad",
        genre: "indie",
        moodTags: ["calm", "dreamy"],
        youtubeUrl: "https://youtu.be/lz_M0b8MnDU?si=yvD1hAkUP3QqA5GF",
      },
      {
        songId: "song9",
        title: "Man Mandira",
        artist: "Ajay Gogavale",
        genre: "marathi",
        moodTags: ["devotional", "spiritual"],
        youtubeUrl: "https://youtu.be/s3_H5QWRWyE?si=kKWrkEABW7G2AoaN",
      },
      {
        songId: "song10",
        title: "Ilahi",
        artist: "Arijit Singh",
        genre: "bollywood",
        moodTags: ["wanderlust", "happy"],
        youtubeUrl: "https://youtu.be/TyX5E6x4Q2s?si=J4UDNKldnN3GH9yF",
      },
      {
        songId: "song11",
        title: "Apsara Aali",
        artist: "Ajay-Atul",
        genre: "marathi",
        moodTags: ["festive", "cultural"],
        youtubeUrl: "https://youtu.be/jp18pN1Y5DI?si=ZHym9vHtAvY0kpYx",
      },
      {
        songId: "song12",
        title: "Pasoori",
        artist: "Ali Sethi, Shae Gill",
        genre: "fusion",
        moodTags: ["unique", "vibey"],
        youtubeUrl: "https://youtu.be/5Eqb_-j3FDA?si=FiZmzAJfRZKNYCPH",
      },
      {
        songId: "song13",
        title: "Night Changes",
        artist: "One Direction",
        genre: "pop",
        moodTags: ["nostalgic", "romantic"],
        youtubeUrl: "https://youtu.be/syFZfO_wfMQ?si=JTIepBe20moWAfnx",
      },
    ]);
    console.log("Songs added!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
}
seedSongs();
