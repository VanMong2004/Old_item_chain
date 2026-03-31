import React from "react";
import "../assets/css/TransactionCard.css"; // Nhúng file CSS
import { useState } from "react";
import apiClient from "../services/apiClient";

// Hàm rút gọn Hash/Ví (Giữ nguyên logic của bạn, tối ưu hiển thị)
function shortenHash(hash) {
  if (!hash) return "Đang xử lý...";
  if (hash.length <= 18) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
}

function TransactionCard({ tx }) {
  const [verifyResult, setVerifyResult] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  // Hàm phụ trợ để map màu sắc cho loại giao dịch
  const getTypeClass = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("cọc") || t.includes("deposit")) return "oc-tx-type-warning";
    if (t.includes("bán") || t.includes("sell") || t.includes("list"))
      return "oc-tx-type-info";
    return "oc-tx-type-success"; // Mặc định cho "Mua" hoặc các giao dịch hoàn tất
  };

  const handleVerify = async () => {
    try {
      setLoadingVerify(true);
      setVerifyResult(null);

      const res = await apiClient.get(`/transactions/verify/${tx._id}`);

      setVerifyResult(res.data.isValid);
    } catch (err) {
      alert("Lỗi verify");
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="oc-tx-card">
      {/* Header: Tên sản phẩm và Loại giao dịch */}
      <div className="oc-tx-header">
        <h3 className="oc-tx-title" title={tx.productName}>
          {tx.productName}
        </h3>
        <span className={`oc-tx-type-badge ${getTypeClass(tx.type)}`}>
          {tx.type === "deposit" ? "Đã đặt cọc" : "Đã giao dịch hoàn tất"}
        </span>
      </div>

      {/* Body: Thông tin tài chính và Các bên tham gia */}
      <div className="oc-tx-body">
        <div className="oc-tx-row oc-tx-highlight-row">
          <div className="oc-tx-col">
            <span className="oc-tx-label">Số tiền giao dịch</span>
            <span className="oc-tx-amount">⟠ {tx.amount} VLDM</span>
          </div>
          <div className="oc-tx-col text-right">
            <span className="oc-tx-label">Thời gian</span>
            <span className="oc-tx-date">{tx.createdAt}</span>
          </div>
        </div>

        <div className="oc-tx-row">
          <div className="oc-tx-col">
            <span className="oc-tx-label">Người mua</span>
            <span className="oc-tx-wallet" title={tx.buyerWallet}>
              {shortenHash(tx.buyerWallet)}
            </span>
          </div>
          <div className="oc-tx-col text-right">
            <span className="oc-tx-label">Người bán</span>
            <span className="oc-tx-wallet" title={tx.sellerWallet}>
              {shortenHash(tx.sellerWallet)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Thông số Blockchain & Trạng thái xác thực */}
      <div className="oc-tx-footer">
        <div className="oc-tx-hashes">
          <div className="oc-tx-hash-item">
            <span className="oc-tx-hash-label">MetaMask Tx:</span>
            <span className="oc-tx-hash-val" title={tx.txHashLocal}>
              {shortenHash(tx.txHashLocal)}
            </span>
          </div>
          <div className="oc-tx-hash-item">
            <span className="oc-tx-hash-label">On-chain Tx:</span>
            <span className="oc-tx-hash-val" title={tx.blockchainTxHash}>
              {shortenHash(tx.blockchainTxHash)}
            </span>
          </div>
        </div>

        {/* --- KHU VỰC NÚT VERIFY ĐƯỢC GẮN CSS --- */}
        <div className="oc-tx-verify-section">
          <button
            className="oc-btn-verify"
            onClick={handleVerify}
            disabled={loadingVerify}
          >
            {loadingVerify ? (
              <>
                <span className="oc-verify-spinner"></span> Đang kiểm tra...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 12 15 15 9"></polyline>
                </svg>
                Verify
              </>
            )}
          </button>

          {/* Hiển thị kết quả Verify (Giữ nguyên text của bạn) */}
          {verifyResult !== null && (
            <div
              className={`oc-verify-badge ${verifyResult ? "valid" : "invalid"}`}
            >
              {verifyResult ? "Hợp lệ" : "Đã bị sửa"}
            </div>
          )}

          {/* Hiển thị Lỗi (nếu có) */}
          {verifyError && (
            <div className="oc-verify-badge invalid">{verifyError}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
