import express from "express";
import connectDB from "./config/dbConnection.js";
import cors from "cors";
import errorHandling from "./middleware/errorHandling.js";
import authRoutes from "./routes/auth.js";

const app = express();

await connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/auth", authRoutes);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server started at ${PORT} PORT`);
});
