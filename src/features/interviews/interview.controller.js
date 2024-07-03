// module imports
import { InterviewRepository } from "./interview.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import StudentRepository from "../students/student.repository.js";

export class InterviewController {
  // Create a new interview
  createInterview = async (req, res, next) => {
    try {
      req.body.date = new Date(req.body.date);
      const interview = await InterviewRepository.add(req.body);
      res.status(201).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  // Get an interview by ID
  getInterviewById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.get(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  // Get all interviews
  getAllInterviews = async (req, res, next) => {
    try {
      const interviews = await InterviewRepository.getAll();
      res.status(200).json({ success: true, interviews });
    } catch (error) {
      next(error);
    }
  };

  // Update an interview
  updateInterview = async (req, res, next) => {
    try {
      const { id: interviewId } = req.params;
      const { studentId, companyId } = req.body;

      // Update the interview
      const interview = await InterviewRepository.update(interviewId, req.body);

      // Update company and student details if provided
      if (studentId && companyId) {
        // Update the company
        await CompanyRepository.update(companyId, { studentId, interviewId });

        // Update the student
        await StudentRepository.update(studentId, { interviewId });
      }

      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  // Delete an interview
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
