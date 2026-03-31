import React from "react";
import { useWallet } from "../context/WalletContext";
import "../assets/css/WalletPage.css"; // Nhúng file CSS mới

function WalletPage() {
  const {
    isConnected,
    account,
    chainId,
    networkName,
    error,
    connectWallet,
    changeWallet,
    refreshWallet,
    logout,
  } = useWallet();

  return (
    <div className="oc-wp-container">
      <div className="oc-wp-header">
        <h1 className="oc-wp-title">Quản Lý Ví</h1>
        <p className="oc-wp-subtitle">
          Kết nối ví MetaMask để thực hiện các giao dịch mua bán an toàn.
        </p>
      </div>

      <div className="oc-wp-content">
        {/* Khung hiển thị Lỗi (nếu có) */}
        {error && (
          <div className="oc-wp-alert">
            <span className="oc-wp-alert-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!isConnected ? (
          /* =========================================
             TRẠNG THÁI: CHƯA KẾT NỐI
          ========================================= */
          <div className="oc-wp-disconnected">
            <div className="oc-wp-icon-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="18" cy="12" r="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <h2>Ví của bạn đang khóa</h2>
            <p>Vui lòng kết nối với mạng lưới để xem thông tin và số dư.</p>
            <button
              className="oc-wp-btn-primary oc-wp-btn-large"
              onClick={connectWallet}
            >
              Kết nối MetaMask
            </button>
          </div>
        ) : (
          /* =========================================
             TRẠNG THÁI: ĐÃ KẾT NỐI
          ========================================= */
          <div className="oc-wp-dashboard">
            {/* Thẻ Ví (Crypto Card) */}
            <div className="oc-wp-crypto-card">
              <div className="oc-wp-card-header">
                <span className="oc-wp-status">
                  <span className="oc-wp-dot"></span> Đã kết nối an toàn
                </span>
              </div>
              <div className="oc-wp-card-body">
                <p className="oc-wp-card-label">Địa chỉ ví (Account)</p>
                <h3 className="oc-wp-card-address">{account}</h3>
              </div>
            </div>

            {/* Thông số Mạng lưới */}
            <div className="oc-wp-network-info">
              <div className="oc-wp-info-box">
                <span className="oc-wp-info-label">Mạng lưới (Network)</span>
                <span className="oc-wp-info-value">
                  {networkName || "Đang tải..."}
                </span>
              </div>
              <div className="oc-wp-info-box">
                <span className="oc-wp-info-label">Mã chuỗi (Chain ID)</span>
                <span className="oc-wp-info-value">{chainId || "--"}</span>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="oc-wp-actions">
              <button className="oc-wp-btn-secondary" onClick={changeWallet}>
                Đổi tài khoản
              </button>
              {account && (
                <button
                  className="oc-wp-btn-secondary"
                  style={{ color: "red" }}
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletPage;
