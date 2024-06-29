import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  batch: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  status: {
    type: String,
    enum: ["placed", "not_placed"],
    default: "not_placed",
  },
  scores: {
    DSA: { type: Number, default: 0 },
    WebDev: { type: Number, default: 0 },
    React: { type: Number, default: 0 },
  },
  interviews: [{ type: Schema.Types.ObjectId, ref: "Interviews" }],
  results: [{ type: Schema.Types.ObjectId, ref: "Results" }],
});

export const StudentModel = model("Students", studentSchema);
