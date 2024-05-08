const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { dataBase } = require("./db");

const app = express();

//Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Database connected
dataBase();

//Routes
app.get("/", (req, res) => {
  res.send("School Management APIs");
});

app.use("/", (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
