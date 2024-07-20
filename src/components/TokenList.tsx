import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { TokenMetadata } from '../services/ethereum';
import BaseText from '../ui/text';
import Token from './Token';

interface TokenListProps {
  handleTokenPress: (token: any) => void;
  tokenBalancesData: TokenMetadata[];
  tokenBalancesLoading: boolean;
  tokenBalancesError: Error;
}

const TokenList = ({
  handleTokenPress,
  tokenBalancesData,
  tokenBalancesLoading,
  tokenBalancesError
}: TokenListProps) => {
  if (tokenBalancesError) {
    return (
      <View className="flex-1">
        <BaseText>Something went wrong with fetching your assets</BaseText>
        {/* retry or redirect */}
      </View>
    );
  }

  return (
    <View className="flex-1">
      <BaseText className={'font-semibold mr-2 my-4'}>Your Tokens</BaseText>

      {tokenBalancesLoading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
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
            data={tokenBalancesData}
            renderItem={({ item }) => (
              <Token token={item} handleTokenPress={handleTokenPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default TokenList;
