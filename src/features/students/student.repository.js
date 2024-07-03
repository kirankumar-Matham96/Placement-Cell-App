// module imports
import { StudentModel } from "./student.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

class StudentRepository {
  // Add a new student
  static add = async (data) => {
    try {
      const newStudent = new StudentModel(data);
      return await newStudent.save();
    } catch (error) {
      throw error;
    }
  };

  // Get all students with populated results and interviews
  static getAll = async () => {
    try {
      const students = await StudentModel.find()
        .populate("results")
        .populate("interviews");
      return students;
    } catch (error) {
      throw error;
    }
  };

  // Get a student by ID with populated results and interviews
  static get = async (studentId) => {
    try {
      const student = await StudentModel.findById(studentId)
        .populate("results")
        .populate("interviews");
      if (!student) {
        throw new ApplicationError("Student not found", 404);
      }
      return student;
    } catch (error) {
      throw error;
    }
  };

  // Update a student by ID
  static update = async (studentId, data) => {
    try {
      const student = await StudentModel.findById(studentId);
      if (!student) {
        throw new ApplicationError("Student not found", 404);
      }

      // Update student fields if provided in data
      if (data.batch) {
        student.batch = data.batch;
      }
      if (data.name) {
        student.name = data.name;
      }
      if (data.email) {
        student.email = data.email;
      }
      if (data.college) {
        student.college = data.college;
      }
      if (data.status) {
        student.status = data.status;
      }
      if (data.scores) {
        student.scores.DSA = data.scores.DSA ?? student.scores.DSA;
        student.scores.WebDev = data.scores.WebDev ?? student.scores.WebDev;
        student.scores.React = data.scores.React ?? student.scores.React;
      }

      // Add interview ID to student if provided
      if (data.interviewId) {
        const interviewFound = student.interviews.find(
          (interview) => interview.toString() === data.interviewId
        );
        if (!interviewFound) {
          student.interviews.push(data.interviewId);
        }
      }

      // Add result ID to student if provided
      if (data.resultId) {
        const isResultExists = student.results.find(
          (result) => result.toString() === data.resultId
        );
        if (!isResultExists) {
          student.results.push(data.resultId);
        }
      }

      const response = await student.save();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Delete a student by ID
  static delete = async (studentId) => {
    try {
      const response = await StudentModel.findByIdAndDelete(studentId);
      if (!response) {
        throw new ApplicationError("Student not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default StudentRepository;
