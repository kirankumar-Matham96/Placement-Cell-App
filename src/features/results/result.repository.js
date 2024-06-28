// module imports
import { ResultModel } from "./result.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class ResultRepository {
  static add = async (data) => {
    try {
      return await ResultModel(data).save();
    } catch (error) {
      throw error;
    }
  };

  static get = async (resultId) => {
    try {
      const result = await ResultModel.findById(resultId);
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
      return await ResultModel.find();
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
