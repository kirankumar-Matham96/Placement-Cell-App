import { ResultRepository } from "./result.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";

export class ResultController {
  // Add a new result
  addResult = async (req, res, next) => {
    try {
      const { companyId, interviewId, studentId } = req.body;

      // Add the result
      const result = await ResultRepository.add(req.body);

      // Update company with result details
      await CompanyRepository.update(companyId, {
        interviewId,
        studentId,
        resultId: result._id,
      });

      // Update student with result details and status
      await StudentRepository.update(studentId, {
        interviewId,
        resultId: result._id,
        status: result.result === "PASS" ? "placed" : "not_placed",
      });

      res
        .status(200)
        .json({ success: true, message: "Result added successfully", result });
    } catch (error) {
      next(error);
    }
  };

  // Get all results
  getResults = async (req, res, next) => {
    try {
      const results = await ResultRepository.getAll();
      res.status(200).json({ success: true, results });
    } catch (error) {
      next(error);
    }
  };

  // Get a result by ID
  getResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.get(id);
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  // Update a result by ID
  updateResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.update(id, req.body);

      // Update student status based on the updated result
      if (req.body.result) {
        await StudentRepository.update(result.studentId, {
          status: result.result === "PASS" ? "placed" : "not_placed",
        });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Result updated successfully",
          result,
        });
    } catch (error) {
      next(error);
    }
  };

  // Add or update a result
  addOrUpdateResult = async (req, res, next) => {
    try {
      const result = await ResultRepository.update2(req.body);

      // Update student status and company details based on the result
      if (req.body.result) {
        console.log("Updating student and company in result controller");
        await StudentRepository.update(result.studentId, {
          status: result.result === "PASS" ? "placed" : "not_placed",
          resultId: result._id,
        });

        await CompanyRepository.update(result.companyId, {
          interviewId: result.interviewId,
          studentId: result.studentId,
          resultId: result._id,
        });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Result updated successfully",
          result,
        });
    } catch (error) {
      next(error);
    }
  };

  // Delete a result by ID
  deleteResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.delete(id);
      res
        .status(200)
        .json({
          success: true,
          message: "Result deleted successfully",
          result,
        });
    } catch (error) {
      next(error);
    }
  };
}
