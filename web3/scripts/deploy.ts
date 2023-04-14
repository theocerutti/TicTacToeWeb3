import { ethers } from "hardhat";

async function main() {
  const TicTacToeFactory = await ethers.getContractFactory("TicTacToe");
  const contract = await TicTacToeFactory.deploy();

  await contract.deployed();

  console.log(`Contract deployed to ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
