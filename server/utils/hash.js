const crypto = require("crypto");

function canonicalTransactionData(transaction) {
  return JSON.stringify({
    productId: transaction.productId?.toString?.() || transaction.productId,
    buyerWallet: transaction.buyerWallet,
    sellerWallet: transaction.sellerWallet,
    type: transaction.type,
    amount: transaction.amount,
    txHashLocal: transaction.txHashLocal,
  });
}

function sha256Hex(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = {
  canonicalTransactionData,
  sha256Hex,
};
