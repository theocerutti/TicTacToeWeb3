import config from '../contractConfig.json';

export const contractConfig: { address: `0x${string}`; abi: any } = {
  address: config.address as `0x${string}`,
  abi: config.abi as any
};
