import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  interviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Interviews",
      required: true,
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
        required: true,
        ref: "Interviews",
      },
      resultId: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

export const CompanyModel = model("Companies", companySchema);
