import '@ethersproject/shims';
import { ethers } from 'ethers';

export interface Providers {
  [network: string]: ethers.providers.InfuraProvider;
}

const INFURA_API_KEY = 'a86e06aa42ab47668ee9442aab00e1c3';

export const providers: Providers = {
  ethereum: new ethers.providers.InfuraProvider('homestead', INFURA_API_KEY),
  arbitrum: new ethers.providers.InfuraProvider('arbitrum', INFURA_API_KEY),
  polygon: new ethers.providers.InfuraProvider('matic', INFURA_API_KEY),
  optimism: new ethers.providers.InfuraProvider('optimism', INFURA_API_KEY)
};
