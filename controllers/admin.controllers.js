import User from "../models/User.js"
import { errorHandler } from "../utils/errorHandler.js"
import { successHandler } from "../utils/successHandler.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return successHandler(res, 200, "Users Fetched SuccessFully", users)
    } catch (error) {
     return errorHandler(res, 400, "Something went wrong fetching users")   
    }
}


export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)

        if(!user){
            return errorHandler(res, 400, "User not found!")
        }

        return successHandler(res, 200, "User deleted successfully")
    } catch (error) {
        return errorHandler(res, 404, "Something went wrong!")
    }
}