import { CompanyRepository } from "./company.repository.js";

export class CompanyController {
  // Add a new company
  addCompany = async (req, res, next) => {
    try {
      // Adjust date from request
      req.body.interview = [req.body.interview];
      const company = await CompanyRepository.add(req.body);
      res.status(201).json({
        success: true,
        message: "Company added successfully",
        company,
      });
    } catch (error) {
      console.log("Error in adding company:", error);
      next(error);
    }
  };

  // Get a company by ID
  getCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await CompanyRepository.get(id);
      res.status(200).json({
        success: true,
        company,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get all companies
  getCompanies = async (req, res, next) => {
    try {
      const companies = await CompanyRepository.getAll();
      res.status(200).json({
        success: true,
        companies,
      });
    } catch (error) {
      next(error);
    }
  };

  // Update a company by ID
  updateCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await CompanyRepository.update(id, req.body);
      res.status(200).json({
        success: true,
        message: "Company updated successfully",
        company,
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete a company by ID
  deleteCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      await CompanyRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "Company deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
