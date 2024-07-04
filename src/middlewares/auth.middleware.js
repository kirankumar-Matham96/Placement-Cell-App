// package imports
import jwt from "jsonwebtoken";

// module imports
import { ApplicationError } from "./errorHandling.Middleware.js";

/**
 * To authenticate user
 * @param {request} req 
 * @param {response} res 
 * @param {next middleware} next 
 */
export const auth = (req, res, next) => {
  try {
    let token = "";

    if (req.cookies.token) {
      token = req.cookies.token;
    } else {
      const authHeaders = req.headers.authorization;
      if (authHeaders && authHeaders.includes("Bearer")) {
        token = authHeaders.split(" ")[1];
      } else {
        token = authHeaders;
      }
    }

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
