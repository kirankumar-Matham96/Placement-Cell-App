// package imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  joinedAt: { type: Date, default: new Date() },
});

// hashing the password
userSchema.pre("save", async function (next) {
  try {
    if (this && this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("Users", userSchema);
