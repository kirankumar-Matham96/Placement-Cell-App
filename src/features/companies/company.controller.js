// imports
import { CompanyRepository } from "./company.repository.js";

/**
 * Controller class to handle the Company related requests
 */
export class CompanyController {
  /**
   * To add new company to inventory
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  addCompany = async (req, res, next) => {
    try {
      // adjust date from request
      req.body.interview = [req.body.interview];
      const company = await CompanyRepository.add(req.body);
      res.status(201).json({
        success: true,
        message: "company added successfully",
        company,
      });
    } catch (error) {
      console.log("in company controller => ", error, "\n\n\n\n");
      next(error);
    }
  };

  /**
   * To get a company by id from inventory
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
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

  /**
   * To get all companies from inventory
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
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

  /**
   * To update a company by id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
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

  /**
   * To delete a company by id from inventory
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
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
