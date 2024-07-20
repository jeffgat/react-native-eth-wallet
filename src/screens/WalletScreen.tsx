import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';
import { useAtom, useAtomValue } from 'jotai';
import { Skeleton } from 'moti/skeleton';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LogoutSheet from '../components/LogoutSheet';
import TokenList from '../components/TokenList';
import { providers } from '../constants/providers';
import { Screens } from '../routes/screens';
import {
  getTokenBalancesAcrossChains,
  TokenMetadata
} from '../services/ethereum';
import { totalBalanceAtom, userAtom } from '../state/atoms';
import Container from '../ui/container';
import BaseText from '../ui/text';
import { THEME } from '../ui/theme';
import { useAsyncData } from '../utils/hooks';

const WalletScreen = ({ navigation }) => {
  const { colors, textSize, spacing } = THEME;
  // todo: need a loading state for this
  const [_, setTokenToSend] = useState(null);
  const logoutSheetRef = useRef<BottomSheet>(null);
  const [totalBalance, setTotalBalance] = useAtom(totalBalanceAtom);
  const user = useAtomValue(userAtom);

  const tokenBalances = useCallback(() => {
    return getTokenBalancesAcrossChains(providers, user.publicAddress);
  }, [user]);

  // need to invalidate everything when the wallet address changes
  const {
    data: tokenBalancesData,
    isLoading: tokenBalancesLoading,
    error: tokenBalancesError
  } = useAsyncData(tokenBalances);

  // handlers
  const handleCopy = async () => {
    await Clipboard.setStringAsync(user.publicAddress);
    Toast.show({
      type: 'success',
      text1: 'Address copied to clipboard!',
      text2: user.publicAddress,
      position: 'bottom'
    });
  };

  const handleTokenPress = (token: TokenMetadata) => {
    if (!user.encryptedPrivateKey) {
      return;
    }

    setTokenToSend(token);
    navigation.navigate(Screens.Send, token);
  };

  // effects
  useEffect(() => {
    if (!tokenBalancesData) {
      return;
    }

    const totalBalance = tokenBalancesData.reduce((acc, item) => {
      acc += item.usdBalance;
      return acc;
    }, 0);

    setTotalBalance(totalBalance);
  }, [tokenBalancesData]);

  if (!user) {
    return navigation.navigate(Screens.Onboarding);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.neutral[900]
      }}
    >
      <Container style={{ flex: 1 }}>
        <View style={{ marginBottom: spacing[4] }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: 100
              }}
              onPress={handleCopy}
            >
              <BaseText
                style={{
                  fontWeight: 500,
                  fontSize: textSize['lg'],
                  marginTop: spacing[4],
                  marginBottom: spacing[4],
                  marginRight: spacing[2],
                  // width: '50%',
                }}
                ellipsizeMode="middle"
                numberOfLines={1}
              >
                {user.publicAddress}
              </BaseText>
              <MaterialCommunityIcons
                name="content-copy"
                size={24}
                color={THEME.colors.neutral[150]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => logoutSheetRef?.current?.snapToIndex(1)}
            >
              <MaterialIcons
                name="logout"
                size={24}
                color={THEME.colors.neutral[150]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: spacing[2]
            }}
          >
            <BaseText
              style={{
                fontWeight: 500,
                fontSize: textSize['sm'],
                textTransform: 'uppercase',
                opacity: 0.6
              }}
            >
              Total Balance
            </BaseText>
            <View
              style={{
                backgroundColor: colors.neutral[800],
                paddingLeft: spacing[3],
                marginLeft: spacing[2],
                paddingRight: spacing[3],
                borderRadius: 80
              }}
            >
              <BaseText
                style={{
                  fontWeight: 500,
                  fontSize: textSize['sm']
                }}
              >
                USD
              </BaseText>
            </View>
          </View>
          {tokenBalancesLoading ? (
            <Skeleton height={40} width={120} radius={80} />
          ) : (
            <BaseText
              style={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: textSize['4xl']
              }}
            >
              ${parseFloat(totalBalance?.toFixed(2)).toLocaleString()}
            </BaseText>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing[4]
          }}
        >
          {user.encryptedPrivateKey ? null : (
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.ImportWallet)}
              style={{
                backgroundColor: colors.neutral[150],
                padding: spacing[3],
                borderRadius: spacing[2],
                marginRight: spacing[2],
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}
            >
              <MaterialCommunityIcons
                name="file-import"
                size={28}
                color={THEME.colors.neutral[900]}
              />
              <BaseText
                style={{
                  color: colors.neutral[900],
                  fontWeight: 500,
                  fontSize: textSize['lg'],
                  marginLeft: spacing[1]
                }}
              >
                Import
              </BaseText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleCopy}
            style={{
              backgroundColor: colors.neutral[150],
              padding: spacing[3],
              borderRadius: spacing[2],
              marginRight: spacing[2],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
          >
            <MaterialIcons
              name="call-received"
              size={28}
              color={THEME.colors.neutral[900]}
            />
            <BaseText
              style={{
                color: colors.neutral[900],
                fontWeight: 500,
                fontSize: textSize['lg'],
                marginLeft: spacing[1]
              }}
            >
              Receive
            </BaseText>
          </TouchableOpacity>
        </View>
        {user.encryptedPrivateKey ? null : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: spacing[4],
              opacity: 0.8
            }}
          >
            <Entypo name="warning" size={24} color={THEME.colors.orange[400]} />
            <BaseText
              style={{
                fontWeight: 500,
                color: colors.orange[400],
                marginLeft: spacing[2]
              }}
            >
              This is a view only wallet. Import your 12-word seed phrase to
              send transactions.
            </BaseText>
          </View>
        )}
        <TokenList
          handleTokenPress={handleTokenPress}
          tokenBalancesData={tokenBalancesData}
          tokenBalancesLoading={tokenBalancesLoading}
          tokenBalancesError={tokenBalancesError}
        />
      </Container>
      <LogoutSheet navigation={navigation} sheetRef={logoutSheetRef} />
    </SafeAreaView>
  );
};

export default WalletScreen;
