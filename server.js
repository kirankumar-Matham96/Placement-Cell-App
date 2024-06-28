// package imports
import express from "express";
import "dotenv/config";

// module imports
import { connectToDB } from "./src/config/db.config.js";

// constants
const PORT = process.env.PORT;

// initializing express app
const app = express();

// setting up input formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// listening to portal
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB();
});
