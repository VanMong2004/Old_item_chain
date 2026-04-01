import { BrowserProvider } from "ethers";

function getReadableNetworkName(chainId, fallbackName) {
  const map = {
    1: "Ethereum Mainnet",
    11155111: "Sepolia",
    // thay bằng chainId thật của Validium bạn đang dùng
    567: "Validium Network",
  };

  return map[Number(chainId)] || fallbackName || "Unknown Network";
}

export async function getWalletData() {
  if (!window.ethereum) {
    throw new Error("MetaMask chưa được cài.");
  }

  const provider = new BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);
  const network = await provider.getNetwork();
  const signer = await provider.getSigner();

  return {
    provider,
    signer,
    account: accounts[0],
    chainId: Number(network.chainId),
    networkName: getReadableNetworkName(network.chainId, network.name),
  };
}

export async function switchWalletAccount() {
  if (!window.ethereum) {
    throw new Error("MetaMask chưa được cài.");
  }

  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [{ eth_accounts: {} }],
  });
}

export function shortenAddress(address) {
  if (!address) return "--";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
