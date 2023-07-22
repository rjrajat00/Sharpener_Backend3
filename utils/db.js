const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-express", "root", "Icando00@#", {
  dialect: "mysql",
  host: "localhost",
});

async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");

    // Use sync() without 'force: true' to create tables if they don't exist
    await sequelize.sync();

    console.log("Synchronized with the database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connectToDb();

module.exports = sequelize;
