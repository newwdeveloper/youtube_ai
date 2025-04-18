import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ You need to EXPORT the function (default or named)
export default function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(400).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
