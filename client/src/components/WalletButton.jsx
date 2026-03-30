import { useWallet } from "../context/WalletContext";
import { shortenAddress } from "../utils/wallet";

function WalletButton() {
  const { isConnected, account, connectWallet, changeWallet } = useWallet();

  return (
    !isConnected ? (
      <div className="wallet-box">
        <button className="btn primary" onClick={connectWallet}>
          Kết nối MetaMask
        </button>
      </div>
    ) : (
      <div className="wallet-box connected-wallet">
        <span className="wallet-address">{shortenAddress(account)}</span>
        <button className="btn secondary" onClick={changeWallet}>
          Đổi ví
        </button>
      </div>
    ))
}

export default WalletButton;
