import { CompanyRepository } from "./company.repository.js";

export class CompanyController {
  addCompany = async (req, res, next) => {
    try {
      const company = await CompanyRepository.add(req.body);
      res.status(201).json({
        success: true,
        message: "company added successfully",
        company,
      });
    } catch (error) {
      next(error);
    }
  };

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

  getCompanies = async (req, res, next) => {
    try {
      const companies = await CompanyRepository.getAll();
      res.status(200).json({
        success: true,
        company: companies,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await CompanyRepository.update(id, req.body);
      res.status(200).json({
        success: true,
        message: "company updated successfully",
        company,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCompany = async (req, res, next) => {
    try {
      const { id } = req.params;
      await CompanyRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "company deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
