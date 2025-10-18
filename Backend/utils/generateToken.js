import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId) => {
  try {
    return jwt.sign(
      { id: userId }, // Only send essential data
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRY || "7d" }
    );
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
};
