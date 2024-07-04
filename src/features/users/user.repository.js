// package imports
import bcrypt from "bcrypt";
// module imports
import { UserModel } from "./user.schema.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

/**
 * Repository class to handle the User related requests
 */
class UserRepository {
  /**
   * To add a new user to the db
   * @param {user data from the client} data 
   * @returns Object
   */
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

  /**
   * To get a user by email and verify
   * @param {user data from the client} data 
   * @returns Boolean
   */
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
