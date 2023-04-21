import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


if (!process.env.PRIVATE_KEY || !process.env.INFURA_API_KEY) {
  console.warn("WARNING: PRIVATE_KEY and INFURA_API_KEY are not set. You will not be able to deploy to Goerli.");
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  ...(process.env.PRIVATE_KEY && process.env.INFURA_API_KEY && {networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }}),
  solidity: "0.8.18",
};

export default config;
