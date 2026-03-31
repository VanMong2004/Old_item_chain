const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    sellerWallet: {
      type: String,
      required: true,
    },
    buyerWallet: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["available", "deposited", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
