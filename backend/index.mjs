import path from "path";
import { config } from "dotenv";
import app from "./app.mjs"; // Import the app from app.mjs
import { db } from "./db/index.js";

const envPath = path.resolve(process.cwd(), ".env");

config({ path: envPath });

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
