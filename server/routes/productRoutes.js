const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy chi tiết sản phẩm" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, depositAmount, imageUrl, sellerWallet } =
      req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      depositAmount,
      imageUrl,
      sellerWallet,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo sản phẩm", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { sellerWallet } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (!sellerWallet) {
      return res.status(400).json({ message: "Thiếu sellerWallet" });
    }

    // kiểm tra đúng người bán
    if (product.sellerWallet.toLowerCase() !== sellerWallet.toLowerCase()) {
      return res.status(403).json({ message: "Không có quyền xóa sản phẩm" });
    }

    // chỉ cho xóa khi chưa có ai đặt cọc
    if (product.status !== "available") {
      return res
        .status(400)
        .json({ message: "Không thể xóa sản phẩm đã có giao dịch" });
    }

    await product.deleteOne();

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR =", err);
    res.status(500).json({
      message: "Lỗi xóa sản phẩm",
      error: err.message,
    });
  }
});

module.exports = router;
