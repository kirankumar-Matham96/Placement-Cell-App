// package imports
import mongoose from "mongoose";

// module imports
import { InterviewModel } from "./interview.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class InterviewRepository {
  static add = async (data) => {
    try {
      const interview = new InterviewModel(data);
      return await interview.save();
    } catch (error) {
      throw error;
    }
  };

  static get = async (interviewId) => {
    try {
      const response = await InterviewModel.findById(interviewId);
      if (!response) {
        throw new ApplicationError("interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  static getAll = async () => {
    try {
      return await InterviewModel.find();
    } catch (error) {
      throw error;
    }
  };

  static update = async (interviewId, data) => {
    try {
      const interview = await InterviewModel.findById(interviewId);
      if (!interview) {
        throw new ApplicationError("interview not found", 404);
      }

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
        throw new ApplicationError("interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  static delete = async (interviewId) => {
    try {
      const response = await InterviewModel.findByIdAndDelete(interviewId);
      if (!response) {
        throw new ApplicationError("interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}
