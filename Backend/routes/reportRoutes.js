import express from "express";
import { addReport } from "../controllers/reportControllers.js";
import { memoryUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/add",
  memoryUpload.single("reportFile"), // reportFile naam se PDF bhejna hoga
  addReport
);

export default router;
