import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

import productRouter from "../routes/products.routes.js";
app.use("/api/v1/products", productRouter);

app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "Welcome To Homepage",
  });
});

export default app;
