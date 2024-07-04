// module imports
import { StudentModel } from "./student.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

class StudentRepository {
  static add = async (data) => {
    try {
      // creating new result
      const newStudent = new StudentModel(data);
      return newStudent.save();
    } catch (error) {
      throw error;
    }
  };

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

  static get = async (studentId) => {
    try {
      const student = await StudentModel.findById(studentId)
        .populate("results")
        .populate("interviews");
      if (!student) {
        throw new ApplicationError("student not found", 403);
      }

      return student;
    } catch (error) {
      throw error;
    }
  };

  static update = async (studentId, data) => {
    try {
      const student = await StudentModel.findById(studentId);
      if (!student) {
        throw new ApplicationError("student not found", 404);
      }

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
        student.scores.DSA = data.scores.DSA
          ? data.scores.DSA
          : student.scores.DSA;
        student.scores.WebDev = data.scores.WebDev
          ? data.scores.WebDev
          : student.scores.WebDev;
        student.scores.React = data.scores.React
          ? data.scores.React
          : student.scores.React;
      }

      if (data.interviewId) {
        const interviewFound = student.interviews.find(
          (interview) => interview.toString() === data.interviewId
        );
        if (!interviewFound) {
          student.interviews.push(data.interviewId);
        }
      }

      if (data.resultId) {
        if (student.results.length > 0) {
          student.results.push(data.resultId);
        } else {
          const isResultExists = student.results.find(
            (result) => result.toString() === data.resultId
          );
          if (!isResultExists) {
            student.results.push(data.resultId);
          }
        }
      }

      const response = await student.save();

      return response;
    } catch (error) {
      console.log("error student repo => ", error);
      throw error;
    }
  };

  static delete = async (studentId) => {
    try {
      const response = await StudentModel.findByIdAndDelete(studentId);
      if (!response) {
        throw new ApplicationError("student not found", 404);
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default StudentRepository;