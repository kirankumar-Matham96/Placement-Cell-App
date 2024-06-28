// package imports
import bcrypt from "bcrypt";
// module imports
import { UserModel } from "./user.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

class UserRepository {
  static signUp = async (data) => {
    try {
      const newUser = await new UserModel(data).save();
      // return await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static signIn = async (data) => {
    try {
      const user = await UserModel.findOne({ email: data.email }).select(
        "+password"
      );

      // if user not found
      if (!user) {
        throw new ApplicationError("user not found", 404);
      }

      // comparing password
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );

      // if password is wrong
      if (!isPasswordCorrect) {
        throw new ApplicationError("invalid credentials", 400);
      }

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default UserRepository;
