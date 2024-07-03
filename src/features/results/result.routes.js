// package imports
import express from "express";

// module imports
import { ResultController } from "./result.controller.js";

const router = express.Router();
const resultController = new ResultController();

router.post("/add", resultController.addResult);
router.get("/", resultController.getResults);
router.get("/:id", resultController.getResult);
router.put("/:id", resultController.updateResult);
router.delete("/:id", resultController.deleteResult);
router.put("/", resultController.addOrUpdateResult);

export default router;
