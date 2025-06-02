// import path from "path";
// import { config } from "dotenv";

// // import app from "./app.js";

// console.log("process", process.cwd());

// const envPath = path.resolve(process.cwd(), ".env");
// console.log("Loading .env from:", envPath);

// config({ path: envPath });

// console.log("DATABASE_URL:", process.env.DATABASE_URL);

// import express from "express";
// import { Pool } from "pg";
// import cors from "cors";
// import { db } from "./db/index.js";
// // import db from "./db/db.js";

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false, // Disable SSL for non-SSL PostgreSQL servers
// });

// const init = async () => {
//   try {
//     await db.sync();
//     app.listen(port, () => console.log(`Server is running on port ${port}`));
//   } catch (err) {
//     console.log(err);
//   }
// };

// init();

// app.get("/api/data", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM posts");
//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching data");
//   }
// });

import path from "path";
import { config } from "dotenv";
import app from "./app.mjs"; // Import the app from app.mjs
import { db } from "./db/index.js";

const envPath = path.resolve(process.cwd(), ".env");
console.log("Loading .env from:", envPath);

config({ path: envPath });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const port = process.env.PORT || 5000;

const init = async () => {
  try {
    // Sync the database
    await db.sync();

    // Start the server
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error("Failed to initialize the app:", err);
  }
};

init();
