// module imports
import { ResultModel } from "./result.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class ResultRepository {
  // Add a new result
  static add = async (data) => {
    try {
      const { studentId, companyId, interviewId } = data;
      // Check if result already exists
      let isResultExists = await ResultModel.findOne({
        studentId,
        companyId,
        interviewId,
      });

      if (isResultExists) {
        throw new ApplicationError("Result already exists", 400);
      }

      const resultResponse = await ResultModel(data).save();

      return resultResponse;
    } catch (error) {
      throw error;
    }
  };

  // Get a result by ID
  static get = async (resultId) => {
    try {
      const result = await ResultModel.findById(resultId)
        .populate("Students")
        .populate("Companies")
        .populate("Interviews");
      if (!result) {
        throw new ApplicationError("Result not found", 404);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Get all results
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

  // Update a result by ID
  static update = async (resultId, data) => {
    try {
      const result = await ResultModel.findByIdAndUpdate(
        resultId,
        { ...data },
        { returnDocument: "after" }
      );
      if (!result) {
        throw new ApplicationError("Result not found", 404);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Add or update a result
  static update2 = async (data) => {
    try {
      const result = await ResultModel.findOne({
        studentId: data.studentId,
        interviewId: data.interviewId,
      });

      if (!result) {
        // If result doesn't exist, add a new one
        return await this.add(data);
      }

      // Update result if 'result' field is provided
      if (data.result) {
        result.result = data.result;
      }

      await result.save({ returnDocument: "after" });
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Delete a result by ID
  static delete = async (resultId) => {
    try {
      const result = await ResultModel.findByIdAndDelete(resultId);
      if (!result) {
        throw new ApplicationError("Result not found", 404);
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
}
