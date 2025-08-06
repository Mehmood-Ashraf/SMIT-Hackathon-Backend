import User from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import { successHandler } from "../utils/successHandler.js";

export const getMe = async (req, res) => {
    try{
        // console.log(req.user)
        const user = await User.findById(req.user.id).select("-password -otp -otpExpires")
        if(!user){
            return errorHandler(res, 400, "user not found!")
        }
        return successHandler(res, 200, "User authenticated",user)
    }catch(error){
        return errorHandler(res, 500, "Some thing went wrong!")
    }
}


