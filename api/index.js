import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import { connectDB } from "../connectDB/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(mongoSanitize());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
