import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import postRoute from "./routes/post.js";

const app = express();

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(json());

// Enable CORS
app.use(cors());

// Define routes
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("root");
});

export default app;
