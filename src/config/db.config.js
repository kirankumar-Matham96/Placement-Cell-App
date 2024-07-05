import mongoose from "mongoose";

const URL = process.env.DB_URL;

// connecting to db
export const connectToDB = async () => {
  await mongoose.connect(URL);
  console.log("DB Connected...");
};

// for transaction session
export const getSession = async () => {
  const session = await mongoose.startSession();
  return session;
};
