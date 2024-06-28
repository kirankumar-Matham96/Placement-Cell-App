export class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
  }
}

export const errorHandlingMiddleware = (err, req, res, next) => {
  const code = err.code || 500;
  const errorMessage =
    err.message || "Something went wrong... Please try again!";

  res.status(code).json({ success: false, error: errorMessage });
};
