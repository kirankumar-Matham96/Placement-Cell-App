// module imports
import { StudentModel } from "./student.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

class StudentRepository {
  static add = async (data) => {
    try {
      const newStudent = new StudentModel(data);
      return newStudent.save();
    } catch (error) {
      throw error;
    }
  };

  static getAll = async () => {
    try {
      return await StudentModel.find();
    } catch (error) {
      throw error;
    }
  };

  static get = async (studentId) => {
    try {
      const student = await StudentModel.findById(studentId);
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
      const response = await StudentModel.findByIdAndUpdate(
        studentId,
        {
          ...data,
        },
        { returnDocument: "after" }
      );

      if (!response) {
        throw new ApplicationError("student not found", 404);
      }

      return response;
    } catch (error) {
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
