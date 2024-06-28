import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  batch: { type: String, required: true },
  details: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String, required: true },
    status: { type: String, enum: ["place", "not_placed"], required: true },
  },
  scores: {
    DSA: { type: Number, required: true },
    WebDev: { type: Number, required: true },
    React: { type: Number, required: true },
  },
  interviews: [
    {
      company: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  results: [
    {
      company: { type: String, required: true },
      result: {
        type: String,
        enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
        required: true,
      },
    },
  ],
});

export const StudentModel = model("Students", studentSchema);
