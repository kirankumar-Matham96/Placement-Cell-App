// package imports
import jwt from "jsonwebtoken";

// module imports
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

const JWT_SECRET = process.env.JWT_SECRET;
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

  loginUser = async (req, res, next) => {
    try {
      const user = await UserRepository.signIn(req.body);
      if (user) {
        // create the token
        const token = jwt.sign(
          { name: user.name, email: user.email, id: user._id },
          JWT_SECRET,
          {
            expiresIn: "1 day",
          }
        );

        return res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
          })
          .json({ success: true, message: "user logged in...", token });
      }
      throw new ApplicationError("invalid credentials", 400);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  logoutUser = async (req, res, next) => {
    try {
      res
        .status(200)
        .clearCookie("token", {
          httpOnly: true,
        })
        .json({ success: true, message: "user logged out..." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default UserController;