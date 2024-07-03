import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  interviews: [
    {
      designation: { type: String, required: true },
      lastDate: { type: Date, required: true },
    },
  ],
  students: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Students",
        required: true,
      },
      interviewId: {
        type: Schema.Types.ObjectId,
        ref: "Interviews",
        required: true,
      },
      resultId: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

export const CompanyModel = model("Companies", companySchema);
