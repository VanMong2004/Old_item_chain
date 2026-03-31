import React from "react";
import { useWallet } from "../context/WalletContext";
import { shortenAddress } from "../utils/wallet";
import "../assets/css/WalletButton.css"; // Nhúng file CSS mới

function WalletButton() {
  const { isConnected, account, connectWallet, changeWallet } = useWallet();

  // Trạng thái: CHƯA KẾT NỐI
  if (!isConnected) {
    return (
      <button className="oc-btn-connect" onClick={connectWallet}>
        {/* Icon MetaMask/Ví đơn giản bằng SVG */}
        <svg
          className="oc-wallet-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
        Kết nối MetaMask
      </button>
    );
  }

  // Trạng thái: ĐÃ KẾT NỐI
  return (
    <div className="oc-wallet-connected-group">
      <div className="oc-wallet-info">
        <span className="oc-status-dot"></span>
        <span className="oc-wallet-address">{shortenAddress(account)}</span>
      </div>
      <button
        className="oc-btn-change"
        onClick={changeWallet}
        title="Đổi tài khoản ví"
        aria-label="Đổi ví"
      >
        {/* Icon Swap/Đổi ví */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </button>
    </div>
  );
}

export default WalletButton;
