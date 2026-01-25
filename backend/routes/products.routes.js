import express from "express";
import {
  saveProductDetails,
  getProductDetails,
  deleteProduct,
  updateEntries,
  getAllCategory,
  getSubcategoriesByCategory,
  getProdyctbyCategory,
  getAllProducts,
} from "../controllers/product.controller.js";

import multerUpload from "../middleware/multer.middleware.js";

const productRouter = express.Router();

productRouter
  .route("/add-product")
  .post(multerUpload.single("product_image"), saveProductDetails);
// productRouter.route("/find-product/category").get(saveProductDetails);
productRouter.route("/find-product").get(getProductDetails);

productRouter.route("/category-all").get(getAllCategory);
productRouter
  .route("/upload")
  .post(multerUpload.single("product_image"), (request, response) => {
    try {
      // Multer stores uploaded file in request.file, not request.body
      const uploadedFile = request.file;

      console.log("Product Image --", uploadedFile);
      console.log("File saved at:", uploadedFile?.path);
      console.log("Original filename:", uploadedFile?.originalname);
      console.log("Other form data:", request.body);

      if (!uploadedFile) {
        return response.status(400).json({
          Success: false,
          message: "No file uploaded",
        });
      }

      return response.json({
        Success: true,
        file: {
          filename: uploadedFile.filename,
          path: uploadedFile.path,
          size: uploadedFile.size,
        },
      });
    } catch (error) {
      console.log("Something went wrong:", error);
      return response.status(500).json({
        Success: false,
        message: error.message,
      });
    }
  });

productRouter
  .route("/subcategories/:categoryName")
  .get(getSubcategoriesByCategory);
productRouter
  .route("/find-product/category/:categoryName")
  .get(getProdyctbyCategory);

productRouter.route("/delete-product/:product_id").delete(deleteProduct);

productRouter.route("/update-product/:id").patch(updateEntries);

productRouter.route("/all-products").get(getAllProducts);

// productRouter.route("/upload-img").post(m);
export default productRouter;
