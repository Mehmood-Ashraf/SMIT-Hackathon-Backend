// models/Analysis.js
import mongoose from "mongoose";


const AnalysisSchema = new Schema({
  report: { type: Schema.Types.ObjectId, ref: 'Report', required: true, index: true },
  // raw response from Gemini (store small hashed/summary; beware of size)
  summary: { type: String },          // final short summary
  homeRemedies: [{ type: String }],  // array of suggestions
  doctorQuestions: [{ type: String }],// questions to ask doctor
  dietTips: [{ type: String }],
  precautions: [{ type: String }],
  analyzedAt: { type: Date, default: Date.now },
  analyzerModel: { type: String, default: 'gemini' }, // keep track of model used
}, { timestamps: true });

export default mongoose.model('Analysis', AnalysisSchema);
