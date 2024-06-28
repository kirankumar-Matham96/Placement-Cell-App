// package imports

// module imports
import { UserModel } from "./user.schema.js";

class UserRepository {
  static signUp = async (data) => {
    try {
      const newUser = new UserModel(data);
      return await newUser.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static signIn = async () => {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static signOut = async () => {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default UserRepository;
