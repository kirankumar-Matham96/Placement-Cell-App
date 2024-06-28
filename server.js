// package imports
import express from "express";
import "dotenv/config";

// constants
const PORT = process.env.PORT;

// initializing express app
const app = express();

// setting up input formats
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
