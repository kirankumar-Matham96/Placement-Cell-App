import { ResultRepository } from "./result.repository.js";

export class ResultController {
  addResult = async (req, res, next) => {
    try {
      const result = await ResultRepository.add(req.body);
      res
        .status(200)
        .json({ success: true, message: "result added successfully", result });
    } catch (error) {
      next(error);
    }
  };

  getResults = async (req, res, next) => {
    try {
      const result = await ResultRepository.getAll();
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  getResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.get(id);
      res.status(200).json({ success: true, result });
    } catch (error) {
      next(error);
    }
  };

  updateResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.update(id);
      res.status(200).json({
        success: true,
        message: "result updated successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteResult = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ResultRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "result deleted successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };
}
