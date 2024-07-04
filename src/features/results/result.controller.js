import { ResultRepository } from "./result.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";

export class ResultController {
  addResult = async (req, res, next) => {
    try {
      const { companyId, interviewId, studentId } = req.body;

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

      res
        .status(200)
        .json({ success: true, message: "result added successfully", result });
    } catch (error) {
      next(error);
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
      const { id } = req.params;
      const result = await ResultRepository.update(id, req.body);

      if (req.body.result) {
        // update student status
        await StudentRepository.update(result.studentId, {
          status: result.result === "PASS" ? "placed" : "not_placed",
        });
      }

      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  addOrUpdateResult = async (req, res, next) => {
    try {
      const result = await ResultRepository.update2(req.body);

      if (req.body.result) {
        console.log("updating student repo in result controller");
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

      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      next(error);
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