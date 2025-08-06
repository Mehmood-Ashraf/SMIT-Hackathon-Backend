import express from 'express';
import dotenv from "dotenv";
import authRoutes from '../routes/authRoutes.js'
import userRoutes from "../routes/userRoutes.js"
import { connectDB } from '../connectDB/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url';


const app = express();
dotenv.config();

// const _filename = fileURLToPath(import.meta.url)
// const _dirname = path.dirname(_filename)

const port = process.env.PORT
connectDB()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}
))
// app.use("/uploads", express.static(path.join(_dirname, "public/uploads")));
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})