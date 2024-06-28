// package imports
import express from "express";
import "dotenv/config";

// module imports
import { connectToDB } from "./src/config/db.config.js";
import userRoutes from "./src/features/users/user.routes.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandling.Middleware.js";

// constants
const PORT = process.env.PORT;

// initializing express app
const app = express();

// setting up input formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/placement-cell/users/", userRoutes);

// app level error handling middleware
app.use(errorHandlingMiddleware);

// listening to portal
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB();
});
