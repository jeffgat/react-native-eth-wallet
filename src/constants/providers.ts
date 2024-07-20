import '@ethersproject/shims';
import { ethers } from 'ethers';

export interface Providers {
  [network: string]: ethers.providers.InfuraProvider;
}

export const providers: Providers = {
  ethereum: new ethers.providers.InfuraProvider('homestead', process.env.EXPO_PUBLIC_INFURA_API_KEY),
  arbitrum: new ethers.providers.InfuraProvider('arbitrum', process.env.EXPO_PUBLIC_INFURA_API_KEY),
  polygon: new ethers.providers.InfuraProvider('matic', process.env.EXPO_PUBLIC_INFURA_API_KEY),
  optimism: new ethers.providers.InfuraProvider('optimism', process.env.EXPO_PUBLIC_INFURA_API_KEY)
};
