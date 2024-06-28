// module imports
import StudentRepository from "./student.repository.js";

class StudentController {
  addStudent = async (req, res, next) => {
    try {
      const student = await StudentRepository.add(req.body);
      res.status(201).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  getAllStudents = async (req, res, next) => {
    try {
      const students = await StudentRepository.getAll();
      res.status(200).json({ success: true, students });
    } catch (error) {
      next(error);
    }
  };

  getStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.get(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  updateStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.update(id, req.body);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };

  deleteStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await StudentRepository.delete(id);
      res.status(200).json({ success: true, student });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
