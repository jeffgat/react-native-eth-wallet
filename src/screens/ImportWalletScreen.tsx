import { Wallet } from 'ethers';
import Constants from 'expo-constants';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Screens } from '../routes/screens';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import Spinner from '../ui/spinner';
import BaseText from '../ui/text';
import BaseTextInput from '../ui/text-input';
import { encryptString } from '../utils/cryptography';
import { cn, validateMnemonic } from '../utils/helpers';

const ImportWalletScreen = ({ navigation }) => {
  const [textValue, setTextValue] = useState(
    'test test test test test test test test test test test junk'
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const setUser = useSetAtom(userAtom);

  // handlers
  const handleSubmit = async () => {
    setSubmitting(true);
    const validation = validateMnemonic(textValue);

    if (validation.valid === false) {
      setSubmitting(false);
      setErrorText(validation.error);
      return setTimeout(() => {
        setErrorText('');
      }, 3000);
    } else {
      setTimeout(() => {
        try {
          // this doesn't return a promise?
          // can't await it so we'll just throw it in a timeout so that we can update ui
          const wallet = Wallet.fromMnemonic(textValue);

          setUser({
            encryptedPrivateKey: encryptString(wallet.privateKey),
            publicAddress: wallet.address
          });
          navigation.navigate(Screens.Wallet);
        } catch (err) {
          if (err.message) {
            Toast.show({
              type: 'error',
              text1: 'Import failed',
              text2: err.message || 'Uknown error',
              position: 'bottom'
            });
          }
        }
        setSubmitting(false);
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView
        className="flex-1 bg-neutral-900"
        style={{
          paddingTop:
            Platform.OS === 'android' ? Constants.statusBarHeight + 48 : 0
        }}
      >
        <Container className="flex flex-1 justify-between">
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <BaseText className="text-center text-2xl font-bold mx-auto mb-2">
              Enter your recovery phrase
            </BaseText>
            <BaseText className="text-center font-medium opacity-60 mx-auto">
              We do NOT store your recovery phrase anywhere except locally on
              your device.
            </BaseText>
            <BaseTextInput
              multiline
              className="h-20 px-2 text-neutral-150 bg-neutral-800 rounded-md mt-4 border"
              placeholder="Enter your 12-word seed phrase"
              textValue={textValue}
              setTextValue={setTextValue}
              editable={!submitting}
            />

            {errorText ? (
              <BaseText className="text-red-400 mt-2 text-center">
                {errorText}
              </BaseText>
            ) : null}
          </ScrollView>

          <TouchableOpacity
            className={cn(
              'mb-4 rounded-md bg-gold-600 h-12 items-center justify-center flex',
              submitting && 'opacity-60'
            )}
            onPress={handleSubmit}
            disabled={submitting}
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
