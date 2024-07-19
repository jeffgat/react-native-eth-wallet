import { TOKEN_IMAGES } from './images';

export interface Token {
  name: string;
  abbr: string;
  image: string;
  chainImage: string;
  priceFeed: string;
}

export interface ERC20Token extends Token {
  address: string;
  decimals: number;
  chain: string;
}

export const erc20Tokens: ERC20Token[] = [
  {
    chain: 'ethereum',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    priceFeed: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
    decimals: 6,
    image: TOKEN_IMAGES.usdt,
    chainImage: TOKEN_IMAGES.eth
  },
  {
    chain: 'ethereum',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    priceFeed: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    decimals: 6,
    image: TOKEN_IMAGES.usdc,
    chainImage: TOKEN_IMAGES.eth
  },
  {
    chain: 'ethereum',
    name: 'Lido Staked Ether',
    abbr: 'stETH',
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    priceFeed: '0xCfE54B5cD566aB89272946F602D76Ea879CAb4a8',
    decimals: 18,
    image: TOKEN_IMAGES.steth,
    chainImage: TOKEN_IMAGES.eth
  },
  {
    chain: 'ethereum',
    name: 'Uniswap',
    abbr: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    priceFeed: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e',
    decimals: 18,
    image: TOKEN_IMAGES.uni,
    chainImage: TOKEN_IMAGES.eth
  },

  {
    chain: 'polygon',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    priceFeed: '0x0A6513e40db6EB1b165753AD52E80663aeA50545',
    decimals: 6,
    image: TOKEN_IMAGES.usdt,
    chainImage: TOKEN_IMAGES.matic
  },
  {
    chain: 'polygon',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    priceFeed: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
    decimals: 6,
    image: TOKEN_IMAGES.usdc,
    chainImage: TOKEN_IMAGES.matic
  },

  {
    chain: 'optimism',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    priceFeed: '0xECef79E109e997bCA29c1c0897ec9d7b03647F5E',
    decimals: 6,
    image: TOKEN_IMAGES.usdt,
    chainImage: TOKEN_IMAGES.op
  },
  {
    chain: 'optimism',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    priceFeed: '0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3',
    decimals: 6,
    image: TOKEN_IMAGES.usdc,
    chainImage: TOKEN_IMAGES.op
  },

  {
    chain: 'optimism',
    name: 'Optimism',
    abbr: 'OP',
    address: '0x4200000000000000000000000000000000000042',
    priceFeed: '0x0D276FC14719f9292D5C1eA2198673d1f4269246',
    decimals: 18,
    image: TOKEN_IMAGES.op,
    chainImage: TOKEN_IMAGES.op
  },

  {
    chain: 'arbitrum',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    priceFeed: '0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7',
    decimals: 6,
    image: TOKEN_IMAGES.usdt,
    chainImage: TOKEN_IMAGES.arb
  },
  {
    chain: 'arbitrum',
    name: 'Arbitrum',
    abbr: 'ARB',
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    priceFeed: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
    decimals: 18,
    image: TOKEN_IMAGES.arb,
    chainImage: TOKEN_IMAGES.arb
  },
  {
    chain: 'arbitrum',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    priceFeed: '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3',
    decimals: 6,
    image: TOKEN_IMAGES.usdc,
    chainImage: TOKEN_IMAGES.arb
  },
  {
    chain: 'arbitrum',
    name: 'Wrapped Bitcoin',
    abbr: 'WBTC',
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    priceFeed: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
    decimals: 8,
    image: TOKEN_IMAGES.wbtc,
    chainImage: TOKEN_IMAGES.arb
  }
];
export const nativeTokens = {
  ethereum: {
    name: 'Ethereum',
    abbr: 'ETH',
    image: TOKEN_IMAGES.eth,
    priceFeed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    chainImage: TOKEN_IMAGES.eth
  },
  polygon: {
    name: 'Polygon',
    abbr: 'MATIC',
    image: TOKEN_IMAGES.matic,
    priceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
    chainImage: TOKEN_IMAGES.matic
  },
  optimism: {
    name: 'Optimistic ETH',
    abbr: 'ETH',
    image: TOKEN_IMAGES.eth,
    priceFeed: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
    chainImage: TOKEN_IMAGES.op
  },
  arbitrum: {
    name: 'Arbitrum ETH',
    abbr: 'ETH',
    image: TOKEN_IMAGES.eth,
    priceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
    chainImage: TOKEN_IMAGES.arb
  }
};
