import express from "express";
import {
  saveProductDetails,
  getProductDetails,
  deleteProduct,
  updateEntries,
  getAllCategory,
  getProdyctbyCategory,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(saveProductDetails);
// productRouter.route("/find-product/category").get(saveProductDetails);
productRouter.route("/find-product").get(getProductDetails);

productRouter.route("/category-all").get(getAllCategory);
productRouter
  .route("/find-product/category/:categoryName")
  .get(getProdyctbyCategory);

productRouter.route("/delete-product").delete(deleteProduct);

productRouter.route("/update-product/:id").patch(updateEntries);

// productRouter.route("/upload-img").post(m);
export default productRouter;
