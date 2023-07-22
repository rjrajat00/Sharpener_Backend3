const expenseModel = require("../models/expense");

exports.postAddExpense = async (req, res, next) => {
  try {
    const { description, amount } = req.body;

    const expense = await expenseModel.create({ description, amount });

    res.status(201).json({ expense });
  } catch (error) {
    console.log("Some Error Occured", error);

    res.status(500).json({ error });
  }
};

exports.getAllExpense = async (req, res, next) => {
  try {
    const expense = await expenseModel.findAll();

    res.status(201).json({ expense });
  } catch (error) {
    console.log("Some Error Occured", error);

    res.status(500).json({ error });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Log the ID received from the request to ensure it's correct
    console.log("Expense ID to delete:", id);

    // Check if the expense with the given ID exists before attempting to delete
    const expense = await expenseModel.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Delete the expense
    await expense.destroy({ where: { id } });

    res.status(204).end();
  } catch (error) {
    console.log("Some Error Occurred", error);
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.log("Some Error Occurred", error);
    res.status(500).json({ error });
  }
};
