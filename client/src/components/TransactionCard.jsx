function TransactionCard({ tx }) {
  return (
    <div className="tx-card">
      <h3>{tx.productName}</h3>
      <p>Loại giao dịch: {tx.type}</p>
      <p>Số tiền: {tx.amount} VNĐ</p>
      <p>Người mua: {tx.buyerWallet}</p>
      <p>Người bán: {tx.sellerWallet}</p>
      <p>TxHash MetaMask: {tx.txHashLocal}</p>
      <p>TxHash Blockchain: {tx.blockchainTxHash}</p>
      <p>Verified: {tx.verified ? "Yes" : "No"}</p>
      <p>Thời gian: {tx.createdAt}</p>
    </div>
  );
}

export default TransactionCard;
