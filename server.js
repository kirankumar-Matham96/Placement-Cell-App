// package imports
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

// module imports
import { connectToDB } from "./src/config/db.config.js";
import userRoutes from "./src/features/users/user.routes.js";
import studentRoutes from "./src/features/students/student.routes.js";
import companyRoutes from "./src/features/companies/company.routes.js";
import interviewRoutes from "./src/features/interviews/interview.routes.js";
import resultRoutes from "./src/features/results/result.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandling.Middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";

// constants
const PORT = process.env.PORT;

// initializing express app
const app = express();

// Enable CORS with specific options
app.use(
  cors({
    origin: "*", // Replace with your frontend domain for production
    credentials: true,
  })
);

// Adding cookie parser middleware
app.use(cookieParser());

// Setting up input formats for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers setup for each request
app.use((req, res, next) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Replace with your frontend domain
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond OK to OPTIONS requests
  }

  next(); // Move to the next middleware or route handler
});

// Routes setup
app.use("/api/placement-cell/users", userRoutes);
app.use("/api/placement-cell/students", auth, studentRoutes); // Auth middleware added for student routes
app.use("/api/placement-cell/companies", auth, companyRoutes); // Auth middleware added for company routes
app.use("/api/placement-cell/interviews", auth, interviewRoutes); // Auth middleware added for interview routes
app.use("/api/placement-cell/results", auth, resultRoutes); // Auth middleware added for result routes

// Error handling middleware for application-level errors
app.use(errorHandlingMiddleware);

// Start listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB(); // Connect to the database when server starts
});
