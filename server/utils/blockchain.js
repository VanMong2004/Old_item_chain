const { ethers } = require("ethers");
require("dotenv").config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_dataHash",
        type: "string",
      },
    ],
    name: "storeRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalRecords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getRecord",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function getProvider() {
  const rpcUrl = process.env.RPC_URL;

  if (!rpcUrl) {
    throw new Error("Thiếu RPC_URL trong .env");
  }

  return new ethers.JsonRpcProvider(rpcUrl);
}

function getReadContract() {
  const provider = getProvider();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

async function getWriteContract() {
  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpcUrl || !privateKey || !CONTRACT_ADDRESS) {
    throw new Error(
      "Thiếu RPC_URL, PRIVATE_KEY hoặc CONTRACT_ADDRESS trong .env",
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const code = await provider.getCode(CONTRACT_ADDRESS);

  if (code === "0x") {
    throw new Error(
      "Địa chỉ CONTRACT_ADDRESS không có contract trên mạng RPC hiện tại.",
    );
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
}

async function storeHashOnChain(dataHash) {
  const contract = await getWriteContract();

  const totalBefore = await contract.getTotalRecords();
  const tx = await contract.storeRecord(dataHash);
  const receipt = await tx.wait();

  return {
    txHash: receipt.hash,
    recordId: totalBefore.toString(),
  };
}

module.exports = {
  storeHashOnChain,
  getReadContract,
};
