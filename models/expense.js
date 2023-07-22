const db = require("../utils/db");

const Sequelize = require("sequelize");

const Expenses = db.define("Expenses", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  description: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },

  amount: {
    type: Sequelize.FLOAT(),
    allowNull: false,
  },
});

module.exports = Expenses;
