import { UseContractConfig } from "wagmi";
import config from "../contractConfig.json";

// @ts-ignore
export const contractConfig: UseContractConfig = {
  address: config.address,
  abi: config.abi as any,
}
