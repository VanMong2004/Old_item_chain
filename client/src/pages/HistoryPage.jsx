import TransactionCard from "../components/TransactionCard";

const mockTransactions = [
  {
    productName: "Laptop Dell cũ",
    type: "deposit",
    amount: 500000,
    buyerWallet: "0xabc...111",
    sellerWallet: "0xdef...222",
    txHashLocal: "0xaaa111bbb222",
    blockchainTxHash: "0xccc333ddd444",
    verified: true,
    createdAt: "30/03/2026 14:35",
  },
  {
    productName: "Laptop Dell cũ",
    type: "complete",
    amount: 4000000,
    buyerWallet: "0xabc...111",
    sellerWallet: "0xdef...222",
    txHashLocal: "0xeee555fff666",
    blockchainTxHash: "0xggg777hhh888",
    verified: true,
    createdAt: "30/03/2026 15:10",
  },
];

function HistoryPage() {
  return (
    <div className="page">
      <h1>Lịch sử giao dịch</h1>

      <div className="tx-list">
        {mockTransactions.map((tx, index) => (
          <TransactionCard key={index} tx={tx} />
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
