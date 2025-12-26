import mongoose from "mongoose";
import Product from "../models/product.models.js";
import Stock from "../models/stocks.models.js";

const updateStock = async (request, response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, stock_action, stock_quantity, reason, reference, note } =
      request.body;

    if (!productId || !stock_action || !stock_quantity || !reason) {
      return response.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    if (stock_quantity <= 0) {
      return response.status(400).json({
        success: false,
        message: "Stock quantity must be greater than 0",
      });
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      return response.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const validMap = {
      IN: ["PURCHASE", "RETURN", "ADJUSTMENT"],
      OUT: ["SALE", "DAMAGE", "ADJUSTMENT"],
    };

    if (!validMap[stock_action]?.includes(reason)) {
      return response.status(400).json({
        success: false,
        message: "Invalid action-reason combination",
      });
    }

    const stock_before = product.product_quantity;
    let stock_after;

    if (stock_action === "IN") {
      stock_after = stock_before + stock_quantity;
    } else {
      if (stock_before < stock_quantity) {
        return response.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }
      stock_after = stock_before - stock_quantity;
    }

    // ✅ Update product quantity
    product.product_quantity = stock_after;
    await product.save({ session });

    // ✅ Create stock transaction
    const stockEntry = await Stock.create(
      [
        {
          product: productId,
          stock_action,
          stock_quantity,
          reason,
          reference,
          stock_before,
          stock_after,
          note,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return response.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: stockEntry[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("updateStock error:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchStockHistory = async (request, response) => {
  try {
    const { productId } = request.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return response.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    // Fetch full history
    const history = await Stock.find({ product: productId })
      .populate("product", "product_name product_sku")
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      totalRecords: history.length,
      data: history,
    });
  } catch (error) {
    console.error("getStockHistory error:", error);
    return ressponse.status(500).json({
      success: false,
      message: "Failed to fetch stock history",
    });
  }
};

export { updateStock, fetchStockHistory };
