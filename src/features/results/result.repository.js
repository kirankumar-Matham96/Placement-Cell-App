// module imports
import { ResultModel } from "./result.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

/**
 * Repository class to handle the Result related requests
 */
export class ResultRepository {
  /**
   * To add new result to the db
   * @param {result data from the client} data 
   * @returns Object
   */
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

  /**
   * To get a result by id from the db
   * @param {result id from the client} resultId 
   * @returns Object
   */
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

  /**
   * To get all the results from the db
   * @returns Object
   */
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

  /**
   * To update result by id in the db
   * @param {result id from the client} resultId 
   * @param {new data from the client} data 
   * @returns Object
   */
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

  /**
   * To update the result by matching studentId and interviewId in the db
   * @param {new result data from the client} data 
   * @returns Object
   */
  static update2 = async (data) => {
    try {
      const result = await ResultModel.findOne({
        studentId: data.studentId,
        interviewId: data.interviewId,
      });


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

  /**
   * To delete a result by id from the db
   * @param {result id from the client} resultId 
   * @returns Object
   */
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