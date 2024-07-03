// package imports
import jwt from "jsonwebtoken";

// module imports
import { ApplicationError } from "./errorHandling.Middleware.js";

/**
 * Middleware for authentication using JWT token.
 * Verifies the token provided in cookies or authorization header.
 * Sets req.userId if authentication is successful.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const auth = (req, res, next) => {
  try {
    let token = "";

    // Check if token is present in cookies
    if (req.cookies.token) {
      token = req.cookies.token;
    } else {
      // Check if token is present in Authorization header
      const authHeaders = req.headers.authorization;
      if (authHeaders && authHeaders.includes("Bearer")) {
        token = authHeaders.split(" ")[1];
      } else {
        token = authHeaders; // Handle case where token format is incorrect
      }
    }

    // Throw error if token is not provided
    if (!token) {
      throw new ApplicationError("Token not provided", 401);
    }

    // Verify the token
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Throw error if token verification fails
    if (!tokenPayload) {
      throw new ApplicationError("Invalid token", 403);
    }

    // Set userId in req object for further processing
    req.userId = tokenPayload.id;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
