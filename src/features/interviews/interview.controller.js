// module imports
import { InterviewRepository } from "./interview.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";
import { getSession } from "../../config/db.config.js";

/**
 * Controller class to handle the Interview related requests
 */
export class InterviewController {
  /**
   * To add new interview
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  createInterview = async (req, res, next) => {
    try {
      req.body.date = new Date(req.body.date);
      const interview = await InterviewRepository.add(req.body);
      res.status(201).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To get an interview by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getInterviewById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.get(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To get all interviews available
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getAllInterviews = async (req, res, next) => {
    try {
      const interview = await InterviewRepository.getAll();
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To update an interview by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  updateInterview = async (req, res, next) => {
    let session;
    try {
      session = await getSession();
      const { id: interviewId } = req.params;
      const { studentId, companyId } = req.body;

      session.startTransaction();
      // updating the interview
      const interview = await InterviewRepository.update(interviewId, req.body);

      // update company and student details
      if (studentId && companyId) {
        // updating the company
        await CompanyRepository.update(companyId, { studentId, interviewId });

        // updating the student
        await StudentRepository.update(studentId, { interviewId });
      }

      await session.commitTransaction();
      res.status(200).json({ success: true, interview });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  };

  /**
   * To delete interview by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  deleteInterview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.delete(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };
}
