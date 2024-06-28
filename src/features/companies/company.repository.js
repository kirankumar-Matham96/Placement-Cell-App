// package imports

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

  static update = async (companyId) => {
    try {
      const response = await CompanyModel.findByIdAndUpdate(companyId);
      if (!response) {
        throw new ApplicationError("company not found", 404);
      }
      return response;
    } catch (error) {
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
