import "@ethersproject/shims"
import { ethers, providers } from "ethers";

const INFURA_API_KEY = 'a86e06aa42ab47668ee9442aab00e1c3'
export const mainnetProvider = new providers.InfuraProvider('homestead', INFURA_API_KEY)