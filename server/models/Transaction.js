const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyerWallet: {
      type: String,
      required: true,
    },
    sellerWallet: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "complete"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    txHashLocal: {
      type: String,
      default: "",
    },
    blockchainTxHash: {
      type: String,
      default: "",
    },
    blockchainRecordId: {
      type: String,
      default: "",
    },
    dataHash: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Transaction", transactionSchema);
