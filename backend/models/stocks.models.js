import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    stock_action: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },

    stock_quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      enum: ["PURCHASE", "SALE", "RETURN", "DAMAGE", "ADJUSTMENT"],
      required: true,
    },

    reference: {
      type: String, // bill / invoice / note
    },

    stock_before: {
      type: Number,
      required: true,
    },

    stock_after: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ HISTORY INDEXES (THIS IS THE ANSWER)
stockSchema.index({ product: 1, createdAt: -1 });
stockSchema.index({ product: 1, stock_action: 1 });
stockSchema.index({ createdAt: -1 });

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
