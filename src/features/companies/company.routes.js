// package imports
import express from "express";

// modules imports
import { CompanyController } from "./company.controller.js";

const router = express.Router();
const companyController = new CompanyController();

router.post("/add", companyController.addCompany);
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.update("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

export default router;
