import { ethers } from 'ethers';
import erc20abi from '../abis/erc20.json';
import { Providers } from '../config/providers';
import { chainAbbrs, ERC20Token, erc20Tokens } from '../config/tokens';

export async function getTokenBalances(
  provider: ethers.providers.InfuraProvider,
  tokens: ERC20Token[],
  address: string
) {
  const balances = [];

  for (const token of tokens) {
    try {
      const contract = new ethers.Contract(token.address, erc20abi, provider);
      const balance = await contract.balanceOf(address);

      // Only add tokens with a balance greater than zero
      if (balance.gt(0)) {
        balances.push({
          chain: token.chain,
          name: token.name,
          abbr: token.abbr,
          address: token.address,
          balance: ethers.utils.formatUnits(balance, token.decimals)
        });
      }
    } catch (error) {
      console.error(`Error fetching balance for token ${token.abbr}:`, error);
    }
  }

  return balances;
}

export async function getErc20Balances(providers: Providers, address: string) {
  const results = [];

  for (const [chain, provider] of Object.entries(providers)) {
    const tokens = erc20Tokens.filter((token) => token.chain === chain);
    if (tokens) {
      const chainBalances = await getTokenBalances(provider, tokens, address);
      results.push(...chainBalances);
    } else {
      console.log(`No tokens found for chain: ${chain}`);
    }
  }

  return results;
}

export async function getNativeTokenBalances(
  providers: Providers,
  address: string
) {
  const results = [];

  for (const [chain, provider] of Object.entries(providers)) {
    try {
      const balance = await provider.getBalance(address);
      results.push({
        name: chain,
        abbr: chainAbbrs[chain],
        balance: ethers.utils.formatEther(balance)
      });
    } catch (error) {
      console.error(`Error fetching native token balance on ${chain}:`, error);
    }
  }

  return results;
}
