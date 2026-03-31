const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
