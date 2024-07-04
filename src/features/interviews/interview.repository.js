// package imports
import mongoose from "mongoose";

// module imports
import { InterviewModel } from "./interview.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

/**
 * Repository class to handle the Interview related requests
 */
export class InterviewRepository {
  /**
   * To add new interview to the db
   * @param {interview data from client} data 
   * @returns Object
   */
  static add = async (data) => {
    try {
      const interview = new InterviewModel(data);
      return await interview.save();
    } catch (error) {
      throw error;
    }
  };

  /**
   * To get an interview by id from the db
   * @param {interview id from the client} interviewId 
   * @returns Object
   */
  static get = async (interviewId) => {
    try {
      const response = await InterviewModel.findById(interviewId)
        .populate("Companies")
        .populate("Students");
      if (!response) {
        throw new ApplicationError("interview not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * To get all the interviews from the db
   * @returns Object
   */
  static getAll = async () => {
    try {
      return await InterviewModel.find()
        .populate("companyId")
        .populate("students");
    } catch (error) {
      throw error;
    }
  };

  /**
   * To update the interview by id in db
   * @param {interview id from the client} interviewId 
   * @param {new data from the client} data 
   * @returns Object
   */
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

  /**
   * To delete the interview from the db
   * @param {interview id from the client} interviewId 
   * @returns Object
   */
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
