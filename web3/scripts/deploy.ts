import { ethers } from "hardhat";

async function main() {
  const TicTacToeFactory = await ethers.getContractFactory("TicTacToe");
  console.log("Deploying contract...");
  const ticTacToe = await TicTacToeFactory.deploy();
  await ticTacToe.deployed();
  console.log(`Deployed contract to: ${ticTacToe.address}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => process.exit(0));
