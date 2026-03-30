import { useWallet } from "../context/WalletContext";

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
  } = useWallet();

  return (
    <div className="page">
      <h1>Ví của tôi</h1>

      <div className="wallet-panel">
        <p>Trạng thái: {isConnected ? "Đã kết nối" : "Chưa kết nối"}</p>
        <p>Địa chỉ ví: {account || "--"}</p>
        <p>Network: {networkName || "--"}</p>
        <p>Chain ID: {chainId || "--"}</p>

        {error && <p className="error-text">{error}</p>}

        <div className="wallet-actions">
          <button className="btn primary" onClick={connectWallet}>
            Kết nối MetaMask
          </button>
          <button className="btn secondary" onClick={changeWallet}>
            Đổi tài khoản
          </button>
          <button className="btn secondary" onClick={refreshWallet}>
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
