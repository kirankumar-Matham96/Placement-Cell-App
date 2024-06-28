import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Students",
        required: true,
      },
      result: {
        type: String,
        enum: []
      }
    },
  ],
});
