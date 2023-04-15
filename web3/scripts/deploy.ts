import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const TicTacToeFactory = await ethers.getContractFactory("TicTacToe");
  console.log("Deploying contract...");
  const ticTacToe = await TicTacToeFactory.deploy();
  await ticTacToe.deployed();
  console.log(`Deployed contract to: ${ticTacToe.address}`);

  // Save the contract address and abi to a file (useful for front-end)
  const contractConfigFilePath = "../frontend/src/contractConfig.json";
  console.log(`Saving contract address and abi to a file...`)
  fs.writeFileSync(
    contractConfigFilePath,
    JSON.stringify({
      address: ticTacToe.address,
      abi: JSON.parse(ticTacToe.interface.format(ethers.utils.FormatTypes.json) as string),
    })
  )
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => process.exit(0));
