import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  const data = {
    id: user._id,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};
