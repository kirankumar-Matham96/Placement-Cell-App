import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviews",
    required: true,
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
    required: true,
  },
});

export const ResultModel = mongoose.model("Results", resultSchema);
