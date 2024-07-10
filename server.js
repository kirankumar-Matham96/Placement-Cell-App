// package imports
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// module imports
import { connectToDB } from "./src/config/db.config.js";
import userRoutes from "./src/features/users/user.routes.js";
import studentRoutes from "./src/features/students/student.routes.js";
import companyRoutes from "./src/features/companies/company.routes.js";
import interviewRoutes from "./src/features/interviews/interview.routes.js";
import resultRoutes from "./src/features/results/result.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandling.Middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import { unknownPathHandlerMiddleware } from "./src/middlewares/unknownPathHandler.middleware.js";

// constants
const PORT = process.env.PORT;

// initializing express app
const app = express();
app.use(cors());

// adding cookie parser
app.use(cookieParser());

// setting up input formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.resolve(), "dist")));

app.use("/api/placement-cell/users", userRoutes);
app.use("/api/placement-cell/students", auth, studentRoutes);
app.use("/api/placement-cell/companies", auth, companyRoutes);
app.use("/api/placement-cell/interviews", auth, interviewRoutes);
app.use("/api/placement-cell/results", auth, resultRoutes);
// app.get("/ui", getUI);
app.get("/", (req, res, next) => {
  res.status(200).send({ message: "Welcome to Placement Cell" });
});

// app level error handling middleware
app.use(errorHandlingMiddleware);

// 404 path request handler
app.use(unknownPathHandlerMiddleware);

// listening to portal
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB();
});
