// module imports
import StudentRepository from "./student.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import { downloadCSVMiddleware } from "../../middlewares/downloadHandler.middleware.js";

/**
 * Controller class to handle the Student related requests
 */
class StudentController {
  addStudent = async (req, res, next) => {
    try {
      console.log(req.body);
      const student = await StudentRepository.add(req.body);
      res.status(201).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  getAllStudents = async (req, res, next) => {
    try {
      const students = await StudentRepository.getAll();
      res.status(200).json({ success: true, students });
    } catch (error) {
      next(error);
    }
  };

  getStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.get(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  updateStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.update(id, req.body);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  deleteStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.delete(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  downloadDataInCSVFormat = async (req, res, next) => {
    try {
      // Get data
      const data = await StudentRepository.getAll();
      const companies = await CompanyRepository.getAll();

      // Map through each student
      const modifiedData = data.map((student) => {
        // Map through each interview of the student
        const interviewDetails = student.interviews
          .map((interview) => {
            // Find the company for the current interview
            const company = companies.find(
              (companyItem) =>
                companyItem._id.toString() === interview.companyId.toString()
            );

            // Find the result for the current interview
            const result = student.results.find(
              (result) =>
                result.studentId.toString() === student._id.toString() &&
                result.companyId.toString() ===
                  interview.companyId.toString() &&
                result.interviewId.toString() === interview._id.toString()
            );

            // Return the interview details with company name and result
            if (company && result) {
              return {
                interviewDate: interview.date,
                interviewCompany: company.name,
                interviewResult: result.result,
              };
            } else {
              return null;
            }
          })
          .filter((detail) => detail !== null); // Filter out any null values

        const arrOfObjects = interviewDetails.map((item) => {
          return {
            studentId: student._id.toString(),
            studentName: student.name,
            studentCollege: student.college,
            studentStatus: student.status,
            DSA: student.scores.DSA,
            WebDev: student.scores.WebDev,
            React: student.scores.React,
            interviewCompanyName: item.interviewCompany,
            interviewDate: item.interviewDate,
            interviewResult: item.interviewResult,
          };
        });

        // Return the modified student data with interview details
        return arrOfObjects;
      });

      // converting to string
      const strData = JSON.stringify(modifiedData.flat());

      downloadCSVMiddleware(strData, res, next);
      // res.status(200).json({ success: true, message: "data downloaded..." });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
