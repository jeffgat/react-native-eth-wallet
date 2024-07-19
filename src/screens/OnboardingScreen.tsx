import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants/theme';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import BaseText from '../ui/text';
import { Screens } from '../routes/screens';

const OnboardingScreen = ({ navigation }) => {
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user.privateKey || user.publicAddress) {
      navigation.navigate(Screens.Wallet);
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 flex justify-center">
      <Container>
        <BaseText className="text-center text-2xl font-bold mx-auto">
          Select an option
        </BaseText>

        <TouchableOpacity
          className="bg-neutral-800 p-4 rounded-lg mt-4"
          onPress={() => navigation.navigate(Screens.ImportWallet)}
        >
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="import"
              size={22}
              color={THEME.colors.gold[600]}
            />
            <BaseText className="font-bold text-lg ml-1">
              Import a wallet
            </BaseText>
          </View>
          <BaseText className="opacity-70">
            Enter your recovery phase to send transactions
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-neutral-800 p-4 rounded-lg mt-4"
          onPress={() => navigation.navigate(Screens.ViewWallet)}
        >
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="eye"
              size={22}
              color={THEME.colors.gold[600]}
            />
            <BaseText className="font-bold text-lg ml-1">
              View a wallet
            </BaseText>
          </View>
          <BaseText className="opacity-70">
            Enter a wallet address to view its token balances
          </BaseText>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
