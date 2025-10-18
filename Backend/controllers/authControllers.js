import User from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import {successHandler} from "../utils/successHandler.js"

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return errorHandler(res, 400, "Missing Fields!");
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return errorHandler(res, 400, "User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    return successHandler(res, 200, {newUser, token})

  } catch (error) {
    return errorHandler(res, 400, error.message)
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return errorHandler(res, 400, "Email and Password are required!");
    }

    // Check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return errorHandler(res, 404, "User not found!");
    }

    // Password match check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorHandler(res, 401, "Invalid credentials!");
    }

    // Generate token
    const token = generateToken(user);

    const { password: pass,  ...userData } = user._doc;

    // Send response
    return successHandler(res, 200, "Login successful!", {
      ...userData,
      token,
    });

  } catch (error) {
    console.log("Login error:", error.message);
    return errorHandler(res, 500, "Something went wrong during login!");
  }
};
