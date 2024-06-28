import UserRepository from "./user.repository.js";

class UserController {
  registerUser = async (req, res, next) => {
    try {
      const newUser = await UserRepository.signUp(req.body);
      res.status(201).json({
        success: true,
        newUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  // loginUser = async (req, res, next) => {
  //   try {

  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // };
}

export default UserController;
