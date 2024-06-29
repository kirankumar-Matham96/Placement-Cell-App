import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  date: { type: Date, required: true },
  position: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
});

export const InterviewModel = mongoose.model("Interviews", interviewSchema);
