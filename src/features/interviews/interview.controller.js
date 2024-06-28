import { InterviewRepository } from "./interview.repository.js";

export class InterviewController {
  createInterview = async (req, res, next) => {
    try {
      const interview = await InterviewRepository.add(req.body);
      res.status(201).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  getInterviewById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.get(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  getAllInterviews = async (req, res, next) => {
    try {
      const interview = await InterviewRepository.getAll();
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  updateInterview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.update(id, req.body);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };

  deleteInterview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const interview = await InterviewRepository.delete(id);
      res.status(200).json({ success: true, interview });
    } catch (error) {
      next(error);
    }
  };
}
