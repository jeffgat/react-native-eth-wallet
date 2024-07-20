import { ethers } from 'ethers';
import priceFeedAbi from '../abis/chainlink.json';
import erc20abi from '../abis/erc20.json';
import { Providers } from '../constants/providers';
import { ERC20Token, erc20Tokens, nativeTokens } from '../constants/tokens';

type SendTransactionRequest = {
  toAddress: string;
  wallet: ethers.Wallet;
  amount: string;
  gasPrice: ethers.BigNumber;
};

export type TokenMetadata = {
  chain: string;
  name: string;
  abbr: string;
  image: string;
  chainImage: string;
  usdBalance: number;
  price: number;
  balance: string;
};

async function getPriceFromFeed(
  provider: ethers.providers.Provider,
  priceFeedAddress: string
) {
  const priceFeed = new ethers.Contract(
    priceFeedAddress,
    priceFeedAbi,
    provider
  );
  const latestRoundData = await priceFeed.latestRoundData();
  const decimals = await priceFeed.decimals();
  const price = latestRoundData.answer;
  return parseFloat(ethers.utils.formatUnits(price, decimals));
}

async function getErc20TokenBalances(
  provider: ethers.providers.InfuraProvider,
  tokens: ERC20Token[],
  address: string
) {
  const results: TokenMetadata[] = [];

  for (const token of tokens) {
    try {
      const contract = new ethers.Contract(token.address, erc20abi, provider);
      const balance = await contract.balanceOf(address);
      const price = await getPriceFromFeed(provider, token.priceFeed);

      // was using this check, however, it made app look bare without have enough tokens in wallet
      // if (balance.gt(0)) {
        results.push({
          chain: token.chain,
          name: token.name,
          abbr: token.abbr,
          image: token.image,
          chainImage: token.chainImage,
          price,
          usdBalance: price * parseFloat(ethers.utils.formatEther(balance)),
          balance: ethers.utils.formatEther(balance)
        });
      // }
    } catch (error) {
      console.log('getErc20TokenBalances error');
      throw new Error(error);
    }
  }

  return results;
}

export async function getTokenBalancesAcrossChains(
  providers: Providers,
  address: string
) {
  const results: TokenMetadata[] = [];

  for (const [chain, provider] of Object.entries(providers)) {
    // erc20
    const erc20s = erc20Tokens.filter((token) => token.chain === chain);
    if (erc20s) {
      const chainBalances = await getErc20TokenBalances(
        provider,
        erc20s,
        address
      );
      results.push(...chainBalances);
    } else {
      console.error(`no tokens found for chain: ${chain}`);
    }

    // native
    try {
      const balance = await provider.getBalance(address);
      const price = await getPriceFromFeed(
        provider,
        nativeTokens[chain].priceFeed
      );

      results.push({
        chain,
        name: nativeTokens[chain].name,
        abbr: nativeTokens[chain].abbr,
        image: nativeTokens[chain].image,
        chainImage: nativeTokens[chain].chainImage,
        price,
        usdBalance: price * parseFloat(ethers.utils.formatEther(balance)),
        balance: ethers.utils.formatEther(balance)
      });
    } catch (error) {
      console.log('getTokenBalancesAcrossChains error');
      throw new Error(error);
    }
  }

  return results.sort((a, b) => b.usdBalance - a.usdBalance);
}

export const getGasPrice = async (
  provider: ethers.providers.InfuraProvider
) => {
  return await provider.getFeeData();
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
    gasLimit: ethers.utils.hexlify(200000), // just an arbitrary gas limit
    gasPrice
  };

  try {
    const txResponse = await wallet.sendTransaction(transaction);

    // to use for activity feed
    const receipt = await txResponse.wait();
    console.log('receipt', receipt);
  } catch (err) {
    console.log('getGasPrice error');
    throw new Error(err);
  }
}
