import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joinedAt: { type: Date, default: new Date() },
  signInToken: { type: String },
  signInTokenExpiresAt: { type: Date },
});

export const UserModel = mongoose.model("Users", userSchema);