import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connectDB/connectDB.js';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import familyMemberRoutes from "./routes/familyMemberRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"

dotenv.config();

const app = express();
connectDB();
app.use(express.json());


app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials : true
    }
));


app.use("/api/auth", authRoutes);
app.use("/api/familyMember", familyMemberRoutes)
app.use("/api/report", reportRoutes)
const port = process.env.PORT;


if (process.env.MODE === "development") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}