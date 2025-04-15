import express from "express";
import connectDB from "./config/dbConnection.js";
import cors from "cors";

const app = express();

await connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("backend works");
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT} PORT`);
});
