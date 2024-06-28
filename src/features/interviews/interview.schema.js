import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  date: { type: Date, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
});

export const InterviewModel = mongoose.model("Interviews", interviewSchema);
