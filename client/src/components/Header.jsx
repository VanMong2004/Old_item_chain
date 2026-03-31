import React from "react";
import { Link } from "react-router-dom";
import WalletButton from "./WalletButton";
import "../assets/css/Layout.css"; 


function Header() {

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🔗</span>
          <span className="logo-text">OldChain Market</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>
          <Link to="/add-product" className="nav-link">
            Đăng sản phẩm
          </Link>
          <Link to="/history" className="nav-link">
            Lịch sử
          </Link>
          <Link to="/wallet" className="nav-link">
            Ví của tôi
          </Link>
        </nav>

        {/* Wallet Container */}
        <div className="wallet-container">
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
