import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LogoutSheet from '../components/LogoutSheet';
import TokenList from '../components/TokenList';
import { THEME } from '../constants/theme';
import { totalBalanceAtom, userAtom } from '../state/atoms';

import { Screens } from '../routes/screens';
import Container from '../ui/container';
import BaseText from '../ui/text';
import { decryptString } from '../utils/cryptography';
import { cn } from '../utils/helpers';

const WalletScreen = ({ navigation }) => {
  // todo: need a loading state for this
  const totalBalance = useAtomValue(totalBalanceAtom);
  const [tokenToSend, setTokenToSend] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const logoutSheetRef = useRef<BottomSheet>(null);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user.encryptedPrivateKey) {
      setPrivateKey(decryptString(user.encryptedPrivateKey));
    }
  }, [user]);

  // check for private key
  const handleCopy = async () => {
    await Clipboard.setStringAsync(user.publicAddress);
    Toast.show({
      type: 'success',
      text1: 'Address copied to clipboard!',
      text2: user.publicAddress,
      position: 'bottom'
    });
  };

  const handleTokenPress = (item) => {
    setTokenToSend(item);
    navigation.navigate(Screens.Send, item);
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <Container className="flex-1">
        <View className="mb-4">
          <View className="flex-row justify-between w-full">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleCopy}
            >
              <BaseText
                className="font-medium my-4 w-1/2 text-lg mr-2"
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
              className="flex-row items-center"
              onPress={() => logoutSheetRef?.current?.snapToIndex(1)}
            >
              <MaterialIcons
                name="logout"
                size={24}
                color={THEME.colors.neutral[150]}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mb-2">
            <BaseText className="font-medium uppercase text-sm opacity-60">
              Total Balance
            </BaseText>
            <View className="bg-neutral-800 ml-2 px-3 rounded-full">
              <BaseText className="text-sm font-medium">USD</BaseText>
            </View>
          </View>
          <BaseText className="font-bold uppercase text-4xl">
            ${parseFloat(totalBalance?.toFixed(2)).toLocaleString()}
          </BaseText>
        </View>
        <View className="flex-row justify-between mb-4">
          {privateKey ? null : (
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.ImportWallet)}
              className={cn(
                'bg-neutral-150 p-3 rounded-md flex-row items-center justify-center flex-1 mr-2'
              )}
            >
              <MaterialCommunityIcons
                name="file-import"
                size={28}
                color={THEME.colors.neutral[900]}
              />
              <BaseText className="text-neutral-900 text-lg font-medium ml-1">
                Import
              </BaseText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleCopy}
            className="bg-neutral-150 p-3 rounded-md flex-row items-center justify-center flex-1 mr-2"
          >
            <MaterialIcons
              name="call-received"
              size={28}
              color={THEME.colors.neutral[900]}
            />
            <BaseText className="text-neutral-900 text-lg font-medium ml-1">
              Receive
            </BaseText>
          </TouchableOpacity>
        </View>
        {privateKey ? null : (
          <View className="flex-row items-center opacity-80 mb-4">
            <Entypo name="warning" size={24} color={THEME.colors.orange[400]} />
            <BaseText className="text-orange-400 font-medium ml-2">
              This is a view only wallet. Import your 12-word seed phrase to
              send transactions.
            </BaseText>
          </View>
        )}
        <TokenList handleTokenPress={handleTokenPress} />
      </Container>
      <LogoutSheet navigation={navigation} sheetRef={logoutSheetRef} />
    </SafeAreaView>
  );
};

export default WalletScreen;
