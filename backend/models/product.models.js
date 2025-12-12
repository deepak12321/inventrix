import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    product_category: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      default: "jlkjlklkjlkj",
    },
    product_cost_price: {
      type: Number,
      required: true,
      default: 0,
    },
    product_unit: {
      type: String,
      default: "pcs",
    },
    product_tax: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    product_selling_price: {
      type: Number,
      required: true,
      default: 0,
    },
    product_quantity: {
      type: Number,
      default: 1,
      required: true,
      min: 0,
    },
    product_min_quantity: {
      type: Number,
      default: 5,
    },
    product_sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;

// {
//   "product_category": "Electronics",
//   "product_name": "Apple iPhone 15",
//   "product_brand": "Apple",
//   "product_image": "https://example.com/images/iphone15.png",
//   "product_cost_price": 65000,
//   "product_unit": "pcs",
//   "product_tax": 18,
//   "product_selling_price": 78000,
//   "product_quantity": 50,
//   "product_min_quantity": 5,
//   "product_sku": "SKU-IP15-001"
// }
