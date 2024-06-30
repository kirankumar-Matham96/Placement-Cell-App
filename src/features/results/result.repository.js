// module imports
import { ResultModel } from "./result.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class ResultRepository {
  static add = async (data) => {
    try {
      const { studentId, companyId, interviewId } = data;
      // if result already exists
      const isResultExists = ResultModel.findOne({
        studentId,
        companyId,
        interviewId,
      });

      if (isResultExists) {
        throw new ApplicationError("result already exists", 400);
      }

      return await ResultModel(data).save();
    } catch (error) {
      throw error;
    }
  };

  static get = async (resultId) => {
    try {
      const result = await ResultModel.findById(resultId).populate("Students").populate("Companies").populate("Interviews");
      if (!result) {
        throw new ApplicationError("result ot found", 404);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  static getAll = async () => {
    try {
      return await ResultModel.find().populate("Students").populate("Companies").populate("Interviews");
    } catch (error) {
      throw error;
    }
  };

  static update = async (resultId, data) => {
    try {
      const result = await ResultModel.findByIdAndUpdate(
        resultId,
        { ...data },
        { returnDocument: "after" }
      );
      if (!result) {
        throw new ApplicationError("result ot found", 404);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  static delete = async (resultId) => {
    try {
      const result = await ResultModel.findByIdAndDelete(resultId);
      if (!result) {
        throw new ApplicationError("result ot found", 404);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
}
