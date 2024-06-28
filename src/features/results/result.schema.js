import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
  },
});

export const ResultModel = mongoose.model("Results", resultSchema);
