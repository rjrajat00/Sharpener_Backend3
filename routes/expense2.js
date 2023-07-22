// routes/expenseRoutes.js
const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Create a new expense
router.post("/", expenseController.postAddExpense);

// Get all expenses
router.get("/get", expenseController.getAllExpense);

router.get("/edit", expenseController.editExpense);

// Delete an expense by ID
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
