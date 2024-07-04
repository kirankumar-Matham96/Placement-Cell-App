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

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// adding cookie parser
app.use(cookieParser());

// setting up input formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Replace with your frontend domain
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api/placement-cell/users", userRoutes);
app.use("/api/placement-cell/students", auth, studentRoutes);
app.use("/api/placement-cell/companies", auth, companyRoutes);
app.use("/api/placement-cell/interviews", auth, interviewRoutes);
app.use("/api/placement-cell/results", auth, resultRoutes);

// app level error handling middleware
app.use(errorHandlingMiddleware);

// listening to portal
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB();
});
