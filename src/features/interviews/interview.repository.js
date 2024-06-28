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
      const response = await InterviewModel.findByIdAndUpdate(interviewId, {
        ...data,
      });
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
