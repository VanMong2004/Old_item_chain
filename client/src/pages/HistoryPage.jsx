import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import { getAllTransactions } from "../services/transactionService";
import "../assets/css/HistoryPage.css"; // Nhúng file CSS

function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Không tải được lịch sử giao dịch.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="oc-hist-page">
      {/* Header trang lịch sử */}
      <div className="oc-hist-header">
        <h1 className="oc-hist-title">
          <span className="oc-hist-icon">📜</span> Sổ Cái Giao Dịch
        </h1>
        <p className="oc-hist-subtitle">
          Theo dõi toàn bộ hoạt động mua bán và bằng chứng xác thực trên
          Blockchain.
        </p>
      </div>

      <div className="oc-hist-content">
        {/* Trạng thái: Đang tải */}
        {loading && (
          <div className="oc-hist-loading">
            <div className="oc-hist-spinner"></div>
            <p>Đang đồng bộ dữ liệu từ mạng lưới Blockchain...</p>
          </div>
        )}

        {/* Trạng thái: Lỗi */}
        {error && (
          <div className="oc-hist-error">
            <span className="oc-hist-error-icon">⚠️</span>
            <p>{error}</p>
            <button className="oc-hist-btn-retry" onClick={fetchTransactions}>
              Thử lại
            </button>
          </div>
        )}

        {/* Trạng thái: Chưa có giao dịch */}
        {!loading && !error && transactions.length === 0 && (
          <div className="oc-hist-empty-state">
            <span className="oc-hist-empty-icon">📭</span>
            <h3>Chưa có giao dịch nào</h3>
            <p>
              Hệ thống chưa ghi nhận bất kỳ giao dịch mua bán hay đặt cọc nào.
            </p>
            <a href="/" className="oc-hist-btn-explore">
              Khám phá sản phẩm ngay
            </a>
          </div>
        )}

        {/* Trạng thái: Danh sách giao dịch */}
        {!loading && !error && transactions.length > 0 && (
          <div className="oc-hist-grid">
            {transactions.map((tx) => (
              <TransactionCard
                key={tx._id}
                tx={{
                  _id: tx._id,
                  productName: tx.productId?.name || "Không rõ sản phẩm",
                  type: tx.type,
                  amount: tx.amount,
                  buyerWallet: tx.buyerWallet,
                  sellerWallet: tx.sellerWallet,
                  txHashLocal: tx.txHashLocal,
                  blockchainTxHash: tx.blockchainTxHash,
                  verified: tx.verified,
                  createdAt: new Date(tx.createdAt).toLocaleString(),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
