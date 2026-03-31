import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  solidity: "0.8.20",
  plugins: [hardhatEthers],
  networks: {
    validium: {
      type: "http",
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
});
