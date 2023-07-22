const express = require("express");

const path = require("path");

const db = require("./utils/db");

var cors = require("cors");

const app = express();

const expenseRoutes = require("./routes/expense2");

app.use(express.static("views"));

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/expenses", expenseRoutes);

app.use(express.static(path.join(__dirname, "views")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "expense.html"));
});

db.authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
    app.listen(4500, () => {
      console.log("Server is running on port 4500");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
