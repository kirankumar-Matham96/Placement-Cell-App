// module imports
import StudentRepository from "./student.repository.js";
import { CompanyRepository } from "../companies/company.repository.js";
import { downloadCSVMiddleware } from "../../middlewares/downloadHandler.middleware.js";

class StudentController {
  // Add a new student
  addStudent = async (req, res, next) => {
    try {
      const student = await StudentRepository.add(req.body);
      res.status(201).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  // Get all students
  getAllStudents = async (req, res, next) => {
    try {
      const students = await StudentRepository.getAll();
      res.status(200).json({ success: true, students });
    } catch (error) {
      next(error);
    }
  };

  // Get a student by ID
  getStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.get(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  // Update a student by ID
  updateStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.update(id, req.body);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  // Delete a student by ID
  deleteStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.delete(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  // Download student data in CSV format
  downloadDataInCSVFormat = async (req, res, next) => {
    try {
      // Get all students and companies
      const students = await StudentRepository.getAll();
      const companies = await CompanyRepository.getAll();

      // Prepare an array to store modified data
      const modifiedData = [];

      // Process each student's interview data
      students.forEach((student) => {
        const interviewDetails = student.interviews
          .map((interview) => {
            // Find the company details for the interview
            const company = companies.find(
              (companyItem) =>
                companyItem._id.toString() === interview.companyId.toString()
            );

            // Find the result details for the interview
            const result = student.results.find(
              (result) =>
                result.studentId.toString() === student._id.toString() &&
                result.companyId.toString() ===
                  interview.companyId.toString() &&
                result.interviewId.toString() === interview._id.toString()
            );

            // Return formatted interview details with company name and result
            if (company && result) {
              return {
                interviewDate: interview.date,
                interviewCompanyName: company.name,
                interviewResult: result.result,
              };
            } else {
              return null;
            }
          })
          .filter((detail) => detail !== null); // Filter out any null values

        // Map interview details to a suitable format for CSV
        const arrOfObjects = interviewDetails.map((item) => ({
          studentId: student._id.toString(),
          studentName: student.name,
          studentCollege: student.college,
          studentStatus: student.status,
          DSA: student.scores.DSA,
          WebDev: student.scores.WebDev,
          React: student.scores.React,
          interviewCompanyName: item.interviewCompanyName,
          interviewDate: item.interviewDate,
          interviewResult: item.interviewResult,
        }));

        // Add formatted data to modifiedData array
        modifiedData.push(...arrOfObjects);
      });

      // Log the first modified data item for reference
      if (modifiedData.length > 0) {
        console.log("modifiedData => ", modifiedData[0]);
      }

      // Convert modifiedData to JSON string
      const strData = JSON.stringify(modifiedData);

      // Call downloadCSVMiddleware to initiate CSV download
      downloadCSVMiddleware(strData);

      // Send success response
      res
        .status(200)
        .json({ success: true, message: "Data downloaded successfully." });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
