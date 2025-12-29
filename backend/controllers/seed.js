import mongoose from "mongoose";
import Product from "../models/product.models.js";
import { sampleProducts } from "./hello.js";

const MONGO_URI =
  "mongodb+srv://deepak7055750270_db_user:47HbM5WcIeVquVvg@inventrix.vlnb3oy.mongodb.net/?appName=inventrix";

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    for (const product of sampleProducts) {
      await Product.create({
        ...product,
        product_category_lower: product.product_category.toLowerCase(),
        product_brand_lower: product.product_brand.toLowerCase(),
        product_name_lower: product.product_name.toLowerCase(),
      });
    }

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
