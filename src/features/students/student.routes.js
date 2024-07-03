// package imports
import { Router } from "express";
// module imports
import StudentController from "./student.controller.js";

const router = Router();
const studentController = new StudentController();

router.post("/add", studentController.addStudent);
router.get("/download", studentController.downloadDataInCSVFormat);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudentById);
router.delete("/:id", studentController.deleteStudentById);

export default router;
