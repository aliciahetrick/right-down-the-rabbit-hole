const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

console.log("PROCESS", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

authenticate();

module.exports = sequelize;
