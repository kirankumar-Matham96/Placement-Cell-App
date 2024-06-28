// package imports
import mongoose from "mongoose";

// module imports
import { InterviewController } from "./interview.controller.js";

const router = mongoose.Router();
const interviewController = new InterviewController();

router.post("/create", interviewController.createInterview);
router.get("/:id", interviewController.getInterviewById);
router.get("/all", interviewController.getAllInterviews);
router.put("/update", interviewController.updateInterview);
router.delete("/delete", interviewController.deleteInterview);

export default router;
