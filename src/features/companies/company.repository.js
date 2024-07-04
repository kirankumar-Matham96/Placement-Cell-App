// package imports
import mongoose from "mongoose";
// module imports
import { CompanyModel } from "./company.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

export class CompanyRepository {
  static add = async (data) => {
    try {
      return await CompanyModel(data).save();
    } catch (error) {
      throw error;
    }
  };

  static get = async (companyId) => {
    try {
      const response = await CompanyModel.findById(companyId);
      // .populate("Interviews")
      // .populate("Students");
      if (!response) {
        throw new ApplicationError("company not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  static getAll = async () => {
    try {
      return await CompanyModel.find()
        .populate("interviews")
        // .populate("students");
        .populate({
          path: "students.studentId",
          model: "Students",
        })
        .populate({
          path: "students.interviewId",
          model: "Interviews",
        });
    } catch (error) {
      throw error;
    }
  };

  static update = async (companyId, data) => {
    try {
      // Fetch the company by ID
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw new ApplicationError("Company not found", 404);
      }

      // Update the company name if provided
      if (data.name) {
        company.name = data.name;
      }

      // Handle student updates
      if (data.studentId && data.interviewId) {
        await this.handleStudentUpdates(company, data);
      }

      // Handle interview updates
      if (data.interview) {
        this.handleInterviewUpdates(company, data.interview);
      }

      // Save the company and return the updated document
      const response = await company.save({ returnDocument: "after" });
      if (!response) {
        throw new ApplicationError("Company not found", 404);
      }

      return response;
    } catch (error) {
      console.log("Error at company repo update => ", { error });
      throw error;
    }
  };

  // Helper function to handle student updates
  static handleStudentUpdates = async (company, data) => {
    if (data.studentId instanceof mongoose.Types.ObjectId) {
      data.studentId = data.studentId.toString();
    }
    if (data.interviewId instanceof mongoose.Types.ObjectId) {
      data.interviewId = data.interviewId.toString();
    }

    const studentIndex = company.students.findIndex(
      (student) =>
        student.studentId.toString() === data.studentId &&
        student.interviewId.toString() === data.interviewId
    );

    if (studentIndex === -1 && data.resultId) {
      throw new ApplicationError("Student details not found", 404);
    }

    if (studentIndex !== -1) {
      // Update existing student
      company.students[studentIndex].resultId = data.resultId;
    } else {
      // Add new student
      const isStudentExists = company.students.some(
        (student) =>
          student.studentId.toString() === data.studentId &&
          student.interviewId.toString() === data.interviewId
      );

      if (isStudentExists) {
        throw new ApplicationError(
          "Student already allocated to this interview",
          400
        );
      }

      company.students.push({
        studentId: data.studentId,
        interviewId: data.interviewId,
        resultId: data.resultId || null,
      });
    }
  };

  // Helper function to handle interview updates
  static handleInterviewUpdates = (company, interviewData) => {
    const interviewFound = company.interviews.find(
      (item) => item.designation === interviewData.designation
    );

    if (interviewFound) {
      // Update existing interview
      if (interviewData.lastDate) {
        interviewFound.lastDate = interviewData.lastDate;
      }
    } else {
      // Add new interview
      company.interviews.push(interviewData);
    }
  };

  static delete = async (companyId) => {
    try {
      const response = await CompanyModel.findByIdAndDelete(companyId);
      if (!response) {
        throw new ApplicationError("company not found", 404);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}
