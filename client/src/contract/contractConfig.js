export const CONTRACT_ADDRESS = "0xA606C93eFA449e7de71647fC7e690DF343F9db28";

export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "recordId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dataHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "RecordStored",
    type: "event",
  },
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
        name: "",
        type: "uint256",
      },
    ],
    name: "records",
    outputs: [
      {
        internalType: "string",
        name: "dataHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
