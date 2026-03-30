import { BrowserProvider } from "ethers";

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
    networkName: network.name,
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
