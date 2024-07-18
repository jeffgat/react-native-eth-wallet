import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { THEME } from '../config/theme';
import { walletAddressAtom } from '../state/global';
import { Screens } from '../types/screens';
import Container from '../ui/container';
import BaseText from '../ui/text';
import { cn } from '../utils/helpers';

const ViewWalletScreen = ({ navigation }) => {
  const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
  const [inputFocused, setInputFocused] = useState(false);
  const [textValue, setTextValue] = useState('0x616Ef1d3cB066BC4e5Ea0fbD06b4055F757c461A');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!ethers.utils.isAddress(textValue)) {
      return console.log('invalid address');
    }

    console.log('success');
    setWalletAddress(textValue);
    navigation.navigate(Screens.Wallet);
  };
  // 0x616Ef1d3cB066BC4e5Ea0fbD06b4055F757c461A
  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView className="flex-1 bg-neutral-900">
        <Container className="mt-8 flex flex-1 justify-between">
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <BaseText className="text-center text-2xl font-bold mx-auto mb-2">
              Enter a wallet address
            </BaseText>
            <BaseText className="text-center font-medium opacity-60 mx-auto">
              You will be only be able to see the assets in this wallet. You
              will not be able to send transactions until you import your
              12-word seed phrase.
            </BaseText>
            <TextInput
              className={cn(
                'h-12 px-2 text-lg text-neutral-150 bg-neutral-800 border-transparent rounded-md mt-4 border items-center',
                inputFocused && 'border-gold-500'
              )}
              textAlignVertical="center"
              placeholder="Wallet address"
              placeholderTextColor={THEME.colors.neutral[550]}
              autoCapitalize="none"
              returnKeyType="done"
              value={textValue}
              blurOnSubmit
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={setTextValue}
              onFocus={() => setInputFocused(true)}
              onEndEditing={() => setInputFocused(false)}
            />
          </ScrollView>

          <TouchableOpacity
            className="mb-4 rounded-md bg-gold-700 h-12 items-center justify-center flex"
            onPress={handleSubmit}
          >
            <BaseText className="text-center text-white font-bold">
              Continue
            </BaseText>
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ViewWalletScreen;
