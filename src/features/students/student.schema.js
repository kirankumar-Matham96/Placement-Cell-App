import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  batch: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  status: { type: String, enum: ["place", "not_placed"], required: true },
  scores: {
    DSA: { type: Number, required: true },
    WebDev: { type: Number, required: true },
    React: { type: Number, required: true },
  },
  interviews: [{ type: Schema.Types.ObjectId, ref: "Interviews" }],
  results: [{ type: Schema.Types.ObjectId, ref: "Results" }],
});

export const StudentModel = model("Students", studentSchema);
