import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { TokenMetadata } from '../services/ethereum';
import BaseText from '../ui/text';
import { THEME } from '../ui/theme';
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
  const { colors, spacing } = THEME;
  if (tokenBalancesError) {
    return (
      <View style={{ flex: 1 }}>
        <BaseText>Something went wrong with fetching your assets</BaseText>
        {/* retry or redirect */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <BaseText
        style={{
          fontWeight: 600,
          marginBottom: spacing[4],
          marginTop: spacing[4],
          marginRight: spacing[2]
        }}
      >
        Your Tokens
      </BaseText>

      {tokenBalancesLoading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: spacing[4],
                backgroundColor: colors.neutral[800],
                borderRadius: spacing[2],
                marginBottom: spacing[2]
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  opacity: 0.6
                }}
              >
                <Skeleton height={48} width={48} radius={80} />
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginLeft: spacing[4]
                  }}
                >
                  <Skeleton height={10} width={70} radius="round" />
                  <Skeleton height={10} width={90} radius="round" />
                </View>
              </View>
              <View style={{ opacity: 0.6 }}>
                <Skeleton height={10} width={60} radius="round" />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={tokenBalancesData}
            renderItem={({ item }) => (
              <Token token={item} handleTokenPress={handleTokenPress} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default TokenList;
