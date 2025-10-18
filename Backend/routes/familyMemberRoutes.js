import express from "express";
import { addFamilyMember, deleteFamilyMember, getFamilyMemberById, getFamilyMembers } from "../controllers/familyMemberController.js";

const router = express.Router();

router.post('/add', addFamilyMember);
router.get('/all', getFamilyMembers);
router.get('/:id', getFamilyMemberById);
router.delete('/:id', deleteFamilyMember)

export default router;
