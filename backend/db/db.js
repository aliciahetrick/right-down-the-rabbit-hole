import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
// import path from "path";

// // Resolve the path to the .env file
// const envPath = path.resolve(process.cwd(), "../.env");
// console.log("Loading .env from:", envPath);

// // Load environment variables
// config({ path: envPath });

// // Access the variables
// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// const databaseUrl = process.env.DATABASE_URL;

// console.log(typeof databaseUrl);

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // <- This is required!
  logging: false,
});

async function authenticate() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

authenticate();

export default db;
