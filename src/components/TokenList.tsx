import { Skeleton } from 'moti/skeleton';
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { providers } from '../config/providers';
import { getErc20Balances, getNativeTokenBalances } from '../services/ethereum';
import BaseText from '../ui/text';
import { cn } from '../utils/helpers';
import { useAsyncData } from '../utils/hooks';

const VITALIK_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

type TokenProps = {
  item: {
    abbr: string;
    name: string;
    balance: string;
    chain?: string;
  };
};

const Token = ({ item }: TokenProps) => (
  <View
    className="bg-neutral-800 mb-2 p-4 rounded-lg flex-row justify-between items-center"
    key={item.chain ? `${item.chain}_${item.abbr}` : item.abbr}
  >
    <View className="flex-row items-center">
      <View className="bg-neutral-400 rounded-full w-12 h-12 mr-4" />
      <View>
        <BaseText className="font-semibold capitalize">{item.name}</BaseText>
        <BaseText className="opacity-60" ellipsizeMode="tail" numberOfLines={1}>
          {parseFloat(item.balance).toFixed(4)} {item.abbr}
        </BaseText>
      </View>
    </View>
    <View>
      {/* <BaseText className="font-semibold">0.000</BaseText> */}
      <BaseText className="opacity-60">$15.00</BaseText>
    </View>
  </View>
);

const TokenList = () => {
  const [tab, setTab] = useState('native');

  const nativeBalances = useCallback(() => {
    return getNativeTokenBalances(providers, VITALIK_ADDRESS);
  }, []);
  const erc20Balances = useCallback(() => {
    return getErc20Balances(providers, VITALIK_ADDRESS);
  }, []);

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

  console.log('erc20BalancesData', erc20BalancesData);
  if (nativeBalancesLoading || erc20BalancesLoading) {
  }

  return (
    <View className="flex-1">
      <View className="flex-row items-center mb-4 mt-4">
        <TouchableOpacity onPress={() => setTab('native')}>
          <BaseText
            className={cn(
              'font-semibold mr-2',
              tab !== 'native' && 'opacity-60'
            )}
          >
            Native Tokens
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('erc20')}>
          <BaseText
            className={cn('font-semibold', tab !== 'erc20' && 'opacity-60')}
          >
            ERC20 Tokens
          </BaseText>
        </TouchableOpacity>
      </View>
      {nativeBalancesLoading || erc20BalancesLoading ? (
        <ScrollView>
          {Array.from({ length: 4 }).map((_, i) => (
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
          {tab === 'native' ? (
            <>
              <FlatList
                className="flex-1"
                data={nativeBalancesData}
                renderItem={({ item }) => <Token item={item} />}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <FlatList
              className="flex-1"
              data={erc20BalancesData}
              renderItem={({ item }) => <Token item={item} />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default TokenList;
