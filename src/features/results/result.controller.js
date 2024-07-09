// imports
import { ResultRepository } from "./result.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";
import { getSession } from "../../config/db.config.js";

/**
 * Controller class to handle the Result related requests
 */
export class ResultController {
  /**
   * To add a new result
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  addResult = async (req, res, next) => {
    let session;
    try {
      const { companyId, interviewId, studentId } = req.body;

      // starting the session
      session = await getSession();

      // start transaction
      session.startTransaction();

      const result = await ResultRepository.add(req.body);
      // update company
      await CompanyRepository.update(companyId, {
        interviewId,
        studentId,
        resultId: result._id,
      });

      // update student
      await StudentRepository.update(studentId, {
        interviewId,
        resultId: result._id,
        status: result.result === "PASS" ? "placed" : "not_placed",
      });

      await session.commitTransaction();

      res
        .status(200)
        .json({ success: true, message: "result added successfully", result });
    } catch (error) {
      // aborting transaction on error
      await session.abortTransaction();
      next(error);
    } finally {
      // End the session
      session.endSession();
    }
  };

  /**
   * To get all the results
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getResults = async (req, res, next) => {
    try {
      const result = await ResultRepository.getAll();
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To get a result by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.get(id);
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To update a result by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  updateResult = async (req, res, next) => {
    // starting the session
    let session;
    try {
      session = await getSession();
      // start transaction
      session.startTransaction();

      const { id } = req.params;
      const result = await ResultRepository.update(id, req.body);

      if (req.body.result) {
        // update student status
        await StudentRepository.update(result.studentId, {
          status: result.result === "PASS" ? "placed" : "not_placed",
        });
      }
      await session.commitTransaction();

      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  };

  /**
   * To add or update result based on user activity.
   * The update2 function will be called to add or update result,
   * and this function does not use result id.
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  addOrUpdateResult = async (req, res, next) => {
    let session;
    try {
      // starting the session
      session = await getSession();
      // starting the transaction
      session.startTransaction();

      const result = await ResultRepository.update2(req.body);

      if (req.body.result) {
        // update student status
        await StudentRepository.update(result.studentId, {
          status: result.result === "PASS" ? "placed" : "not_placed",
          resultId: result._id,
        });

        // update the company object
        await CompanyRepository.update(result.companyId, {
          interviewId: result.interviewId,
          studentId: result.studentId,
          resultId: result._id,
        });
      }
      await session.commitTransaction();
      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  };

  /**
   * To delete a result by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  deleteResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "result deleted successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };
}
