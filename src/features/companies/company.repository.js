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
      return await CompanyModel.find();
    } catch (error) {
      throw error;
    }
  };

  static update = async (companyId, data) => {
    try {
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw new ApplicationError("company not found", 404);
      }

      if (data.name) {
        company.name = data.name;
      }

      if (data.interviewId) {
        if (company.interviews) {
          // find interview
          const isInterviewExists = company.interviews.find(
            (interview) => interview.toString() === data.interviewId
          );

          // if interview do not exists
          if (!isInterviewExists) {
            company.interviews.push(data.interviewId);
          }
        } else {
          company.interviews = [data.interviewId];
        }
      }

      if (data.studentId && data.interviewId && data.resultId) {
        console.log(
          "if student exists in the list => ",
          company.students.includes(
            mongoose.Types.ObjectId.createFromHexString(data.studentId)
          )
        );
        if (
          !company.students.includes(
            mongoose.Types.ObjectId.createFromHexString(data.studentId)
          )
        ) {
          company.students.push({
            studentId: data.studentId,
            interviewId: data.interviewId,
            resultId: data.resultId,
          });
        } else {
          // find the object and update
          const student = company.students.find(
            (student) => student.studentId.toString() === data.studentId
          );
          student.resultId = data.resultId;
        }
      } else if (data.studentId && data.interviewId) {
        const isStudentExists = company.students.findIndex(
          (student) =>
            student.studentId.toString() === data.studentId &&
            student.interviewId.toString() === data.interviewId
        );

        // if student is already allocated
        if (isStudentExists != -1) {
          throw new ApplicationError(
            "student already allocated to this interview",
            400
          );
        }

        // allocating student to the interview
        company.students.push({
          studentId: data.studentId,
          interviewId: data.interviewId,
        });
      }

      const response = await company.save();

      if (!response) {
        throw new ApplicationError("company not found", 404);
      }
      return response;
    } catch (error) {
      console.log("error at company repo update => ", { error });
      throw error;
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
