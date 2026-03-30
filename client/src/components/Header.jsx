import { Link } from "react-router-dom";
import WalletButton from "./WalletButton";

function Header() {
  return (
    <header className="header">
      <div className="logo">OldChain Market</div>

      <nav className="nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/add-product">Đăng sản phẩm</Link>
        <Link to="/history">Lịch sử</Link>
        <Link to="/wallet">Ví của tôi</Link>
      </nav>

      <WalletButton />
    </header>
  );
}

export default Header;