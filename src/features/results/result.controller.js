// imports
import { ResultRepository } from "./result.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";
import { getSession } from "../../config/db.config.js";

/**
 * Controller class to handle the Result related requests
 */
export class ResultController {
  addResult = async (req, res, next) => {
    // starting the session
    const session = await getSession();
    try {
      const { companyId, interviewId, studentId } = req.body;

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

  getResults = async (req, res, next) => {
    try {
      const result = await ResultRepository.getAll();
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  getResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.get(id);
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  updateResult = async (req, res, next) => {
    try {
      // starting the session
      const session = getSession();

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

  addOrUpdateResult = async (req, res, next) => {
    try {
      // starting the session
      const session = getSession();

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
      session.commitTransaction();
      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  };

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
