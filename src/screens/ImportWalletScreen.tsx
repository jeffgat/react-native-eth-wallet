import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { Wallet } from 'ethers';
import * as SecureStore from 'expo-secure-store';
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
import Container from '../ui/container';
import Spinner from '../ui/spinner';
import BaseText from '../ui/text';
import { cn } from '../utils/helpers';

type Props = {};

const ImportWalletScreen = (props: Props) => {
  const [inputFocused, setInputFocused] = React.useState(false);
  const [textValue, setTextValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log(key, result);
    } else {
      console.log('No values stored under that key.');
    }
  }
  const handleSubmit = async () => {
    const validation = bip39.validateMnemonic(textValue, wordlist);

    if (!validation) {
      return console.log('invalid phrase');
    }
    try {
      setSubmitting(true);

      const wallet1 = Wallet.fromMnemonic(textValue);
      console.log('success');
      save('publicAddress', wallet1.address);
      save('privateKey', wallet1.privateKey);
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  };

  // todos:
  // encrypt before saving to device

  const mnemonic =
    'test test test test test test test test test test test junk';

  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView className="flex-1 bg-neutral-900">
        <Container className="mt-8 flex flex-1 justify-between">
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <BaseText className="text-center text-2xl font-bold mx-auto mb-2">
              Enter your recovery phrase
            </BaseText>
            <BaseText className="text-center font-medium opacity-60 mx-auto">
              We do NOT store your recovery phrase anywhere except locally on
              your device.
            </BaseText>
            <TextInput
              multiline
              className={cn(
                'h-28 px-2 text-lg text-neutral-150 bg-neutral-800 border-transparent rounded-md mt-4 border',
                inputFocused && 'border-gold-500'
              )}
              placeholder="Enter your 12-word seed phrase"
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
            {submitting ? (
              <Spinner />
            ) : (
              <BaseText className="text-center text-white font-bold">
                Import Wallet
              </BaseText>
            )}
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ImportWalletScreen;
