import Report from "../models/Reports.js";
import FamilyMember from "../models/FamilyMember.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/errorHandler.js";
import { successHandler } from "../utils/successHandler.js";
import { pdfParser } from "../utils/pdfParser.js";

// Add Report Controller
export const addReport = async (req, res) => {
  try {
    const { userId, familyMemberId, name, doctorName, hospitalName, vitals } = req.body;

    // File check
    if (!req.file) {
      return errorHandler(res, 400, "Report PDF file is required!");
    }

    // Upload PDF to Cloudinary
    const pdfUrl = await uploadOnCloudinary(req.file, "memory");
    if (!pdfUrl) {
      return errorHandler(res, 500, "Failed to upload PDF to Cloudinary!");
    }
    
    // Save report to DB
    const newReport = new Report({
        user: userId,
        familyMember: familyMemberId,
        name,
        doctorName,
        hospitalName,
        vitals: vitals ? JSON.parse(vitals) : {}, // Vitals as dynamic key/value
        url: pdfUrl,
    });
    
    pdfParser(newReport)

    const savedReport = await newReport.save();

    await FamilyMember.findByIdAndUpdate(familyMemberId, {
      $push: { reports: savedReport._id }
    });
    return successHandler(res, 200, "Report uploaded and saved successfully!", savedReport)

  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};
