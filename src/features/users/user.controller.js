// package imports
import jwt from "jsonwebtoken";

// module imports
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../middlewares/errorHandling.Middleware.js";

const JWT_SECRET = process.env.JWT_SECRET;

class UserController {
  // Register a new user
  registerUser = async (req, res, next) => {
    try {
      const newUser = await UserRepository.signUp(req.body);
      res.status(201).json({
        success: true,
        newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // Login user
  loginUser = async (req, res, next) => {
    try {
      const user = await UserRepository.signIn(req.body);
      if (user) {
        // Create JWT token
        const token = jwt.sign(
          { name: user.name, email: user.email, id: user._id },
          JWT_SECRET,
          {
            expiresIn: "1 day",
          }
        );

        // Set cookie with JWT token
        return res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
          })
          .json({ success: true, message: "User logged in...", token });
      }
      throw new ApplicationError("Invalid credentials", 400);
    } catch (error) {
      next(error);
    }
  };

  // Logout user
  logoutUser = async (req, res, next) => {
    try {
      // Clear JWT token cookie
      res
        .status(200)
        .clearCookie("token", {
          httpOnly: true,
        })
        .json({ success: true, message: "User logged out..." });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
