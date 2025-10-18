import mongoose from "mongoose";

export const ReportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    familyMember: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember", required: true },
    name : {
        type : String,
        required : true
    },
    doctorName : {
        type : String
    },
    hospitalName : {
        type : String
    },
    url : {
        type : String,
        required : true
    },
    vitals : {
        type : Map,
        of : String,
        default : {}
    },
    analysisIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Analysis" }
    ],

}, {timestamps : true});

export default mongoose.model("Report", ReportSchema)