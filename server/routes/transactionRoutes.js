const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

const { canonicalTransactionData, sha256Hex } = require("../utils/hash");
const { storeHashOnChain, getReadContract } = require("../utils/blockchain");

// =======================
// GET ALL TRANSACTIONS
// =======================
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({
      message: "Lỗi lấy danh sách giao dịch",
      error: err.message,
    });
  }
});

// =======================
// DEPOSIT
// =======================
router.post("/deposit", async (req, res) => {
  try {
    const { productId, buyerWallet, txHashLocal } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (product.status !== "available") {
      return res.status(400).json({ message: "Sản phẩm không thể đặt cọc" });
    }

    // tạo transaction
    const transaction = new Transaction({
      productId,
      buyerWallet,
      sellerWallet: product.sellerWallet,
      amount: product.depositAmount,
      type: "deposit",
      txHashLocal,
    });

    // tạo hash
    const canonical = canonicalTransactionData(transaction);
    const txHash = sha256Hex(canonical);

    // lưu blockchain
    const chainResult = await storeHashOnChain(
      transaction._id.toString(),
      txHash,
    );

    transaction.blockchainTxHash = chainResult.txHash;
    transaction.blockchainRecordId = chainResult.recordId;
    transaction.verified = true;

    await transaction.save();

    // cập nhật product
    product.status = "deposited";
    product.buyerWallet = buyerWallet;
    await product.save();

    res.json({
      message: "Đặt cọc thành công",
      transaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi tạo giao dịch đặt cọc",
      error: err.message,
    });
  }
});

// =======================
// COMPLETE
// =======================
router.post("/complete", async (req, res) => {
  try {
    const { productId, buyerWallet, txHashLocal } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (product.status !== "deposited") {
      return res.status(400).json({ message: "Sản phẩm chưa được đặt cọc" });
    }

    // 🔥 kiểm tra đúng người đã đặt cọc
    if (!product.buyerWallet) {
      return res.status(400).json({ message: "Chưa có người đặt cọc" });
    }

    if (product.buyerWallet.toLowerCase() !== buyerWallet.toLowerCase()) {
      return res.status(403).json({
        message: "Chỉ người đã đặt cọc mới được thanh toán hoàn tất",
      });
    }

    const remainAmount = product.price - product.depositAmount;

    const transaction = new Transaction({
      productId,
      buyerWallet,
      sellerWallet: product.sellerWallet,
      amount: remainAmount,
      type: "complete",
      txHashLocal,
    });

    // tạo hash
    const canonical = canonicalTransactionData(transaction);
    const txHash = sha256Hex(canonical);

    // lưu blockchain
    const chainResult = await storeHashOnChain(
      transaction._id.toString(),
      txHash,
    );

    transaction.blockchainTxHash = chainResult.txHash;
    transaction.blockchainRecordId = chainResult.recordId;
    transaction.verified = true;

    await transaction.save();

    // cập nhật product
    product.status = "sold";
    await product.save();

    res.json({
      message: "Thanh toán hoàn tất",
      transaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi thanh toán hoàn tất",
      error: err.message,
    });
  }
});

// =======================
// VERIFY HASH
// =======================
router.get("/verify/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);

    if (!tx) {
      return res.status(404).json({ message: "Không tìm thấy giao dịch" });
    }

    if (
      tx.blockchainRecordId === "" ||
      tx.blockchainRecordId === null ||
      tx.blockchainRecordId === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Giao dịch chưa có blockchainRecordId" });
    }

    const canonical = canonicalTransactionData(tx);
    const localHash = sha256Hex(canonical);

    const contract = getReadContract();
    const record = await contract.getRecord(tx.blockchainRecordId);
    const chainHash = record[0];

    const isValid = localHash === chainHash;

    res.json({
      localHash,
      chainHash,
      isValid,
    });
  } catch (err) {
    console.error("VERIFY ERROR =", err);
    res.status(500).json({
      message: "Lỗi verify",
      error: err.message,
    });
  }
});

module.exports = router;
