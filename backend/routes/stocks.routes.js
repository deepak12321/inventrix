import express from "express";
import {
  updateStock,
  fetchStockHistory,
} from "../controllers/stock.controller.js";

const stockRouter = express.Router();

stockRouter.route("/update-stocks").post(updateStock);

stockRouter.route("/history/:productId").get(fetchStockHistory);

// history/:productId

export default stockRouter;
