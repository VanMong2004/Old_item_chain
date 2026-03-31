import { createContext, useContext, useEffect, useState } from "react";
import { getWalletData, switchWalletAccount } from "../utils/wallet";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      setError("");

      const data = await getWalletData();

      setProvider(data.provider);
      setSigner(data.signer);
      setAccount(data.account);
      setChainId(data.chainId);
      setNetworkName(data.networkName);
      setIsConnected(true);
    } catch (err) {
      setError(err.message || "Không kết nối được MetaMask.");
    }
  };

  const changeWallet = async () => {
    try {
      setError("");
      await switchWalletAccount();

      const data = await getWalletData();

      setProvider(data.provider);
      setSigner(data.signer);
      setAccount(data.account);
      setChainId(data.chainId);
      setNetworkName(data.networkName);
      setIsConnected(true);
    } catch (err) {
      setError(err.message || "Không đổi được tài khoản.");
    }
  };

  const refreshWallet = async () => {
    try {
      if (!window.ethereum) return;

      const data = await getWalletData();

      setProvider(data.provider);
      setSigner(data.signer);
      setAccount(data.account);
      setChainId(data.chainId);
      setNetworkName(data.networkName);
      setIsConnected(true);
    } catch (err) {
      console.log("Chưa có kết nối ví.");
    }
  };

  useEffect(() => {
    refreshWallet();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      if (!accounts.length) {
        setAccount("");
        setChainId("");
        setNetworkName("");
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        return;
      }

      await refreshWallet();
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const logout = () => {
    setAccount(null);
    setSigner(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        networkName,
        provider,
        signer,
        isConnected,
        error,
        connectWallet,
        changeWallet,
        refreshWallet,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
