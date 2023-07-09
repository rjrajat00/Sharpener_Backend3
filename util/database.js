const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-express", "root", "Icando00@#", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
