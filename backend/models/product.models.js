import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
    product_category_lower: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    product_brand_lower: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    product_name_lower: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    product_image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?t=st=1765617934~exp=1765621534~hmac=47d6019c5221a000cadd3d13918f92ef6f800c69eaa290a2a65fe8e823cdad57&w=1480",
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
    is_active: {
      type: Boolean,
      default: true,
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
