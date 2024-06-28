import mongoose from "mongoose";

const URL = process.env.DB_URL;

export const connectToDB = async () => {
  await mongoose.connect(URL);
  console.log("DB Connected...");
};
