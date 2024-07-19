import { ethers } from 'ethers';
import priceFeedAbi from '../abis/chainlink.json';
import erc20abi from '../abis/erc20.json';
import { Providers } from '../constants/providers';
import { ERC20Token, erc20Tokens, nativeTokens } from '../constants/tokens';

async function getErc20TokenBalances(
  provider: ethers.providers.InfuraProvider,
  tokens: ERC20Token[],
  address: string
) {
  const results = [];

  for (const token of tokens) {
    try {
      const contract = new ethers.Contract(token.address, erc20abi, provider);
      const priceFeed = new ethers.Contract(
        token.priceFeed,
        priceFeedAbi,
        provider
      );
      const balance = await contract.balanceOf(address);
      const latestRoundData = await priceFeed.latestRoundData();
      const decimals = await priceFeed.decimals();
      const price = latestRoundData.answer;

      if (balance.gt(0)) {
        results.push({
          chain: token.chain,
          image: token.image,
          chainImage: token.chainImage,
          usdBalance:
            parseFloat(ethers.utils.formatUnits(price, decimals)) *
            parseFloat(ethers.utils.formatUnits(balance, token.decimals)),
          price: parseFloat(ethers.utils.formatUnits(price, decimals)),
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

  return results;
}

export async function getErc20BalancesAcrossChains(
  providers: Providers,
  address: string
) {
  const results = [];

  for (const [chain, provider] of Object.entries(providers)) {
    const erc20s = erc20Tokens.filter((token) => token.chain === chain);
    if (erc20s) {
      const chainBalances = await getErc20TokenBalances(
        provider,
        erc20s,
        address
      );
      results.push(...chainBalances);
    } else {
      console.log(`No tokens found for chain: ${chain}`);
    }
  }

  return results.sort((a, b) => b.usdBalance - a.usdBalance);
}

export async function getNativeTokenBalances(
  providers: Providers,
  address: string
) {
  const results = [];

  for (const [chain, provider] of Object.entries(providers)) {
    try {
      const balance = await provider.getBalance(address);

      const priceFeed = new ethers.Contract(
        nativeTokens[chain].priceFeed,
        priceFeedAbi,
        provider
      );
      const latestRoundData = await priceFeed.latestRoundData();
      const decimals = await priceFeed.decimals();
      const price = latestRoundData.answer;

      results.push({
        chain,
        name: nativeTokens[chain].name,
        abbr: nativeTokens[chain].abbr,
        image: nativeTokens[chain].image,
        chainImage: nativeTokens[chain].chainImage,
        usdBalance:
          parseFloat(ethers.utils.formatUnits(price, decimals)) *
          parseFloat(ethers.utils.formatEther(balance)),
        price: parseFloat(ethers.utils.formatUnits(price, decimals)),
        balance: ethers.utils.formatEther(balance)
      });
    } catch (error) {
      console.error(`Error fetching native token balance on ${chain}:`, error);
    }
  }

  return results.sort((a, b) => b.usdBalance - a.usdBalance);
}

export const getGasPrice = async (
  provider: ethers.providers.InfuraProvider
) => {
  return await provider.getFeeData();
};

type SendTransactionRequest = {
  toAddress: string;
  wallet: ethers.Wallet;
  amount: string;
  gasPrice: ethers.BigNumber;
};

export async function sendTransaction({
  toAddress,
  wallet,
  amount,
  gasPrice
}: SendTransactionRequest) {
  const transaction = {
    to: toAddress,
    value: ethers.utils.parseEther(amount),
    gasLimit: ethers.utils.hexlify(200000), // arbitrary gas limit
    gasPrice
  };

  try {
    const txResponse = await wallet.sendTransaction(transaction);

    // to use for activity feed
    const receipt = await txResponse.wait();
    console.log('receipt', receipt);
  } catch (err) {
    throw new Error(err);
  }
}
