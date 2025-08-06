import { errorHandler } from "../utils/errorHandler.js"
import { verifyToken } from "./verifyToken.js"


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        }else{
            return errorHandler(res, 400, "You are not Authenticated Only Admin can Access")
        }
    })
}