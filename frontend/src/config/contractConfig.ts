import { UseContractConfig } from "wagmi";
import config from "../contractConfig.json";

export const contractConfig: UseContractConfig = {
  address: config.address,
  abi: config.abi as any,
}
