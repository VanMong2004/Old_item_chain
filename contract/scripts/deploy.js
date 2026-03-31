import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect("validium");

  const ContractFactory = await ethers.getContractFactory("TransactionStorage");
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
