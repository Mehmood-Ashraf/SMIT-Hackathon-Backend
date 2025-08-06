import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country : {
        type : String,
        required : true
    },
    img : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        required : true
    },
    phone : {
        type : String,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isActive : {
        type : Boolean,
        default : true
    },
    otp : {
        type : String
    },
    otpExpires : {
        type : Date
    }
}, { timestamps: true})


export default mongoose.model("User", UserSchema)