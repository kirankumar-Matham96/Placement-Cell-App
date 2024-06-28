// package imports
import jwt from "jsonwebtoken";

// module imports
import { ApplicationError } from "./errorHandling.Middleware.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new ApplicationError("token not provided", 401);
    }

    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenPayload) {
      throw new ApplicationError("invalid token", 403);
    }

    req.userId = tokenPayload.id;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
