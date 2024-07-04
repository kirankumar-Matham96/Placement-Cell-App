/**
 * Custom class for handling errors
 */
export class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
  }
}

/**
 * To handle errors in teh application level
 * @param {error from the application} err
 * @param {request} req
 * @param {response} res
 * @param {next middleware} next
 */
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Check for duplicate key error for unique values
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field} '${value}' already exists.`;
    err = new ApplicationError(message, 400);
  }

  const code = err.code || 500;
  const errorMessage =
    err.message || "Something went wrong... Please try again!";
  console.log(err);
  res.status(code).json({ success: false, error: errorMessage });
};
