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
    password: {
        type: String,
        required: true
    },
    familyMembers : [
        { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }
    ]
    
}, { timestamps: true})


export default mongoose.model("User", UserSchema)