// module imports
import { InterviewRepository } from "./interview.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";

/**
 * Controller class to handle the Interview related requests
 */
export class InterviewController {
  createInterview = async (req, res, next) => {
    try {
      req.body.date = new Date(req.body.date);
      const interview = await InterviewRepository.add(req.body);
      // await CompanyRepository.update(req.body.companyId, {
      //   interviewId: interview._id,
      // });
      res.status(201).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  getInterviewById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.get(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  getAllInterviews = async (req, res, next) => {
    try {
      const interview = await InterviewRepository.getAll();
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  updateInterview = async (req, res, next) => {
    try {
      const { id: interviewId } = req.params;
      const { studentId, companyId } = req.body;

      // updating the interview
      const interview = await InterviewRepository.update(interviewId, req.body);

      // update company and student details
      if (studentId && companyId) {
        // updating the company
        await CompanyRepository.update(companyId, { studentId, interviewId });

        // updating the student
        await StudentRepository.update(studentId, { interviewId });
      }
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

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
