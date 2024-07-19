import { useAtomValue, useSetAtom } from 'jotai';
import { Skeleton } from 'moti/skeleton';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { providers } from '../constants/providers';
import {
  getErc20BalancesAcrossChains,
  getNativeTokenBalances
} from '../services/ethereum';

import { totalBalanceAtom, userAtom } from '../state/atoms';
import BaseText from '../ui/text';
import { useAsyncData } from '../utils/hooks';
import Token from './Token';

const TokenList = ({ handleTokenPress }) => {
  const user = useAtomValue(userAtom);
  const setTotalBalance = useSetAtom(totalBalanceAtom);

  const nativeBalances = useCallback(() => {
    return getNativeTokenBalances(providers, user.publicAddress);
  }, []);
  const erc20Balances = useCallback(() => {
    return getErc20BalancesAcrossChains(providers, user.publicAddress);
  }, []);

  // need to invalidate everything when the wallet address changes
  const {
    data: nativeBalancesData,
    isLoading: nativeBalancesLoading,
    error: nativeBalancesError
  } = useAsyncData(nativeBalances);
  const {
    data: erc20BalancesData,
    isLoading: erc20BalancesLoading,
    error: erc20BalancesError
  } = useAsyncData(erc20Balances);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!nativeBalancesData || !erc20BalancesData) {
      return;
    }

    const totalNativeBalance = nativeBalancesData.reduce((acc, item) => {
      acc += item.usdBalance;
      return acc;
    }, 0);

    const totalErc20Balance = erc20BalancesData.reduce((acc, item) => {
      acc += item.usdBalance;
      return acc;
    }, 0);

    setTotalBalance(totalNativeBalance + totalErc20Balance);
  }, [nativeBalancesData, erc20BalancesData]);

  if (nativeBalancesError || erc20BalancesError) {
    return (
      <View className="flex-1">
        <BaseText>Something went wrong with fetching your assets</BaseText>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <BaseText className={'font-semibold mr-2 my-4'}>Your Tokens</BaseText>

      {nativeBalancesLoading || erc20BalancesLoading ? (
        <ScrollView>
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              className="flex flex-row items-center justify-between p-4 bg-neutral-800 rounded-lg mb-2"
            >
              <View className="flex flex-row opacity-60">
                <Skeleton height={48} width={48} radius={80} />
                <View className="flex justify-around ml-4">
                  <Skeleton height={10} width={70} radius="round" />
                  <Skeleton height={10} width={90} radius="round" />
                </View>
              </View>
              <View className="opacity-60">
                <Skeleton height={10} width={60} radius="round" />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1">
          <FlatList
            className="flex-1"
            data={[...nativeBalancesData, ...erc20BalancesData]}
            renderItem={({ item }) => (
              <Token
                item={item}
                handleTokenPress={() => handleTokenPress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default TokenList;
