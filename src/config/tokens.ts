export interface Token {
  name: string;
  abbr: string;
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
    decimals: 6
  },
  {
    chain: 'ethereum',
    name: 'Binance Coin',
    abbr: 'BNB',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    decimals: 18
  },
  {
    chain: 'ethereum',
    name: 'XRP',
    abbr: 'XRP',
    address: '0x628F76eAB0C1298F7a24d337bBbF1ef8A1Ea6A24',
    decimals: 6
  },
  {
    chain: 'ethereum',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6
  },
  {
    chain: 'ethereum',
    name: 'Lido Staked Ether',
    abbr: 'stETH',
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    decimals: 18
  },

  {
    chain: 'polygon',
    name: 'Wrapped Ether',
    abbr: 'WETH',
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimals: 18
  },
  {
    chain: 'polygon',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6
  },
  {
    chain: 'polygon',
    name: 'Binance Coin',
    abbr: 'BNB',
    address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    decimals: 18
  },

  {
    chain: 'optimism',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    decimals: 6
  },
  {
    chain: 'optimism',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    decimals: 6
  },
  {
    chain: 'optimism',
    name: 'Wrapped Bitcoin',
    abbr: 'WBTC',
    address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    decimals: 8
  },

  {
    chain: 'arbitrum',
    name: 'Tether USD',
    abbr: 'USDT',
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    decimals: 6
  },
  {
    chain: 'arbitrum',
    name: 'USD Coin',
    abbr: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6
  },
  {
    chain: 'arbitrum',
    name: 'Wrapped Bitcoin',
    abbr: 'WBTC',
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8
  }
];

export const chainAbbrs = {
  ethereum: 'ETH',
  polygon: 'MATIC',
  optimism: 'OP',
  arbitrum: 'ARB'
};

export const nativeTokens: Token[] = [
  { name: 'Ethereum', abbr: 'ETH' },
  { name: 'Arbitrum', abbr: 'ARB' },
  { name: 'Polygon', abbr: 'MATIC' },
  { name: 'Optimism', abbr: 'OPT' }
];
