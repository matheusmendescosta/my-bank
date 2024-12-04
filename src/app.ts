import express from "express";
import dotenv from "dotenv";
import route from "./http/routes/route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/health", (req, res) => {
  res.status(200).json({
    msg: "health",
  });
});

app.use("/api/v1/", route)

export default app;
