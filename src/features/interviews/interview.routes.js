// package imports
import express from "express";

// module imports
import { InterviewController } from "./interview.controller.js";

const router = express.Router();
const interviewController = new InterviewController();

router.post("/add", interviewController.createInterview);
router.get("/:id", interviewController.getInterviewById);
router.get("/", interviewController.getAllInterviews);
router.put("/:id", interviewController.updateInterview);
router.delete("/:id", interviewController.deleteInterview);

export default router;
