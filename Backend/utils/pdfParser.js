import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from 'mongoose';
import { AnalysisSchema } from './models/Analysis.js'; // assuming you have this schema

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Mongo model
const Analysis = mongoose.model('Analysis', AnalysisSchema);

// POST route
router.post('/analyze-report', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF file uploaded" });

    // Step 1: Parse PDF content
    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(fileBuffer);
    const text = pdfData.text.trim();

    if (!text) return res.status(400).json({ error: "Empty PDF or unreadable content" });

    // Step 2: Prompt Gemini
    const prompt = `
You are a medical analysis assistant. 
Given the text of a medical report below, extract and summarize:
1. Short overall summary
2. Home remedies (if any)
3. Questions the patient can ask the doctor
4. Diet tips
5. Precautions

If any field is not applicable or not found, return "-" for that field.
Return data in JSON format matching this schema:
{
  "summary": "",
  "homeRemedies": [],
  "doctorQuestions": [],
  "dietTips": [],
  "precautions": []
}

Report text:
${text}
    `;

    const result = await model.generateContent(prompt);
    const rawOutput = result.response.text();
    
    // Step 3: Clean and parse the output safely
    let parsed;
    try {
      parsed = JSON.parse(rawOutput);
    } catch {
      parsed = {
        summary: "-",
        homeRemedies: ["-"],
        doctorQuestions: ["-"],
        dietTips: ["-"],
        precautions: ["-"]
      };
    }

    // Step 4: Fill missing fields with "-"
    const filled = {
      summary: parsed.summary || "-",
      homeRemedies: parsed.homeRemedies?.length ? parsed.homeRemedies : ["-"],
      doctorQuestions: parsed.doctorQuestions?.length ? parsed.doctorQuestions : ["-"],
      dietTips: parsed.dietTips?.length ? parsed.dietTips : ["-"],
      precautions: parsed.precautions?.length ? parsed.precautions : ["-"]
    };

    // Step 5: Save to MongoDB
    const analysis = await Analysis.create({
      report: req.body.reportId, // must be passed in body
      summary: filled.summary,
      homeRemedies: filled.homeRemedies,
      doctorQuestions: filled.doctorQuestions,
      dietTips: filled.dietTips,
      precautions: filled.precautions,
      analyzerModel: 'gemini'
    });

    res.json({
      success: true,
      data: analysis
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


import { errorHandler } from "./errorHandler"

export const pdfParser = async  (report, req) => {
    try {
         if (!report.url) throw new Error("PDF URL is missing in the report");
          try {
    if (!req.file) return res.status(400).json({ error: "No PDF file uploaded" });

    // Step 1: Parse PDF content
    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(fileBuffer);
    const text = pdfData.text.trim();

    if (!text) return res.status(400).json({ error: "Empty PDF or unreadable content" });

    // Step 2: Prompt Gemini
    const prompt = `
You are a medical analysis assistant. 
Given the text of a medical report below, extract and summarize:
1. Short overall summary
2. Home remedies (if any)
3. Questions the patient can ask the doctor
4. Diet tips
5. Precautions

If any field is not applicable or not found, return "-" for that field.
Return data in JSON format matching this schema:
{
  "summary": "",
  "homeRemedies": [],
  "doctorQuestions": [],
  "dietTips": [],
  "precautions": []
}

Report text:
${text}
    `;

    const result = await model.generateContent(prompt);
    const rawOutput = result.response.text();
    
    // Step 3: Clean and parse the output safely
    let parsed;
    try {
      parsed = JSON.parse(rawOutput);
    } catch {
      parsed = {
        summary: "-",
        homeRemedies: ["-"],
        doctorQuestions: ["-"],
        dietTips: ["-"],
        precautions: ["-"]
      };
    }

    // Step 4: Fill missing fields with "-"
    const filled = {
      summary: parsed.summary || "-",
      homeRemedies: parsed.homeRemedies?.length ? parsed.homeRemedies : ["-"],
      doctorQuestions: parsed.doctorQuestions?.length ? parsed.doctorQuestions : ["-"],
      dietTips: parsed.dietTips?.length ? parsed.dietTips : ["-"],
      precautions: parsed.precautions?.length ? parsed.precautions : ["-"]
    };

    // Step 5: Save to MongoDB
    const analysis = await Analysis.create({
      report: req.body.reportId, // must be passed in body
      summary: filled.summary,
      homeRemedies: filled.homeRemedies,
      doctorQuestions: filled.doctorQuestions,
      dietTips: filled.dietTips,
      precautions: filled.precautions,
      analyzerModel: 'gemini'
    });

    res.json({
      success: true,
      data: analysis
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
         

    } catch (error) {
        
    }
}

