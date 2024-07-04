// module imports
import { ResultModel } from "./result.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class ResultRepository {
  static add = async (data) => {
    try {
      const { studentId, companyId, interviewId } = data;
      // if result already exists
      let isResultExists = await ResultModel.findOne({
        studentId,
        companyId,
        interviewId,
      });

      if (isResultExists) {
        throw new ApplicationError("result already exists", 400);
      }

      const resultResponse = await ResultModel(data).save();

      return resultResponse;
    } catch (error) {
      throw error;
    }
  };

  static get = async (resultId) => {
    try {
      const result = await ResultModel.findById(resultId)
        .populate("Students")
        .populate("Companies")
        .populate("Interviews");
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
      return await ResultModel.find()
        .populate("Students")
        .populate("Companies")
        .populate("Interviews");
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

  static update2 = async (data) => {
    try {
      const result = await ResultModel.findOne({
        studentId: data.studentId,
        interviewId: data.interviewId,
      });

      console.log("in results repo => ", { result });

      if (!result) {
        return await this.add(data);
      }

      if (data.result) {
        result.result = data.result;
      }

      await result.save({ returnDocument: "after" });
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