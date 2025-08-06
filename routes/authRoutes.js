import express from "express";
import { login, logout, register, resendOtp, forgetPassword, verifyOTP, resetPassword } from "../controllers/auth.controllers.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router()

router.post('/register', upload.single("img"),  register)
router.post('/verifyEmail', verifyOTP)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgetPassword', rateLimiter(1*60*1000, 3),forgetPassword)
router.post('/reset-password/:token', rateLimiter(1*60*1000, 3),verifyToken, resetPassword);
router.post('/resend-otp', resendOtp)

export default router