// package imports
import mongoose from "mongoose";

// module imports
import { InterviewModel } from "./interview.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class InterviewRepository {
  // Add a new interview
  static add = async (data) => {
    try {
      const interview = new InterviewModel(data);
      return await interview.save();
    } catch (error) {
      throw error;
    }
  };

  // Get an interview by ID
  static get = async (interviewId) => {
    try {
      const response = await InterviewModel.findById(interviewId)
        .populate("Companies")
        .populate("Students");
      if (!response) {
        throw new ApplicationError("Interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Get all interviews
  static getAll = async () => {
    try {
      return await InterviewModel.find()
        .populate("companyId")
        .populate("students");
    } catch (error) {
      throw error;
    }
  };

  // Update an interview
  static update = async (interviewId, data) => {
    try {
      const interview = await InterviewModel.findById(interviewId);
      if (!interview) {
        throw new ApplicationError("Interview not found", 404);
      }

      // Update fields if provided
      if (data.companyId) {
        interview.companyId = data.companyId;
      }
      if (data.date) {
        interview.date = data.date;
      }
      if (data.position) {
        interview.position = data.position;
      }
      if (data.studentId) {
        const student = interview.students.find(
          (student) => student.toString() === data.studentId
        );
        if (!student) {
          interview.students.push(
            mongoose.Types.ObjectId.createFromHexString(data.studentId)
          );
        }
      }

      const response = await interview.save();
      if (!response) {
        throw new ApplicationError("Interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Delete an interview
  static delete = async (interviewId) => {
    try {
      const response = await InterviewModel.findByIdAndDelete(interviewId);
      if (!response) {
        throw new ApplicationError("Interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}
