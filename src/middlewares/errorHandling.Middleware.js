export class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
  }
}

export const errorHandlingMiddleware = (err, req, res, next) => {
  // Check for duplicate key error
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
