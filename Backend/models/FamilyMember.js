import mongoose from "mongoose";

const FamilyMemberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    memberName : {
        type : String,
    },
    relation: { type: String }, // optional: brother, father etc
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }] 
    }, {timestamps : true})

export default mongoose.model("FamilyMember", FamilyMemberSchema)
