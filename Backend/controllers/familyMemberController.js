import FamilyMember from "../models/FamilyMember.js";
import User from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import { successHandler } from "../utils/successHandler.js";


// Add new Family Member
export const addFamilyMember = async (req, res) => {
  try {
    const { userId, memberName, relation } = req.body;

    if (!userId || !memberName) {
      return errorHandler(res, 400, "User ID and Member Name are required!");
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorHandler(res, 404, "User not found!");
    }

    const newMember = await FamilyMember.create({
      user: userId,
      memberName,
      relation,
    });

    // Push member id into user's familyMembers list
    user.familyMembers.push(newMember._id);
    await user.save();

    return successHandler(res, 201, "Family member added successfully!", newMember);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Failed to add family member!");
  }
};


// Get all Family Members of a User
export const getFamilyMembers = async (req, res) => {
  try {
    const { userId } = req.params;

    const members = await FamilyMember.find({ user: userId }).populate("reports");
    return successHandler(res, 200, "Family members fetched!", members);
  } catch (error) {
    return errorHandler(res, 500, "Failed to fetch family members!");
  }
};


// Get single Member
export const getFamilyMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await FamilyMember.findById(memberId).populate("reports");

    if (!member) return errorHandler(res, 404, "Family member not found!");

    return successHandler(res, 200, "Family member found!", member);
  } catch (error) {
    return errorHandler(res, 500, "Failed to get family member!");
  }
};


// Update Family Member
export const updateFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const updatedData = req.body;

    const updatedMember = await FamilyMember.findByIdAndUpdate(
      memberId,
      updatedData,
      { new: true }
    );

    if (!updatedMember)
      return errorHandler(res, 404, "Family member not found!");

    return successHandler(res, 200, "Family member updated!", updatedMember);
  } catch (error) {
    return errorHandler(res, 500, "Failed to update family member!");
  }
};


// Delete Family Member
export const deleteFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const removedMember = await FamilyMember.findByIdAndDelete(memberId);
    if (!removedMember)
      return errorHandler(res, 404, "Family member not found!");

    // Remove from user's list too
    await User.findByIdAndUpdate(removedMember.user, {
      $pull: { familyMembers: memberId },
    });

    return successHandler(res, 200, "Family member deleted successfully!");
  } catch (error) {
    return errorHandler(res, 500, "Failed to delete family member!");
  }
};
