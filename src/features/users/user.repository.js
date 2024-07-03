// package imports
import bcrypt from "bcrypt";

// module imports
import { UserModel } from "./user.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

class UserRepository {
  // Sign up a new user
  static signUp = async (data) => {
    try {
      const newUser = await new UserModel(data).save();
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Sign in user
  static signIn = async (data) => {
    try {
      // Find user by email and include password field
      const user = await UserModel.findOne({ email: data.email }).select(
        "+password"
      );

      // If user not found
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }

      // Compare provided password with stored hash
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );

      // If password is incorrect
      if (!isPasswordCorrect) {
        throw new ApplicationError("Invalid credentials", 400);
      }

      return user; // Return the user object
    } catch (error) {
      throw error;
    }
  };
}

export default UserRepository;
