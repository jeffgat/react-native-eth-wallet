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
import { THEME } from '../ui/theme';
import { encryptString } from '../utils/cryptography';
import { validateMnemonic } from '../utils/helpers';

const ImportWalletScreen = ({ navigation }) => {
  const { colors, textSize, spacing } = THEME;
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.neutral[900],
          paddingTop:
            Platform.OS === 'android' ? Constants.statusBarHeight + 48 : 0
        }}
      >
        <Container
          style={{
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <BaseText
              style={{
                fontSize: textSize['2xl'],
                fontWeight: 700,
                marginBottom: spacing[2],
                textAlign: 'center'
              }}
            >
              Enter your recovery phrase
            </BaseText>
            <BaseText
              style={{
                fontWeight: 500,
                opacity: 0.6,
                textAlign: 'center'
              }}
            >
              We do NOT store your recovery phrase anywhere except locally on
              your device.
            </BaseText>
            <BaseTextInput
              multiline
              style={{
                marginTop: spacing[4],
                height: 80,
                padding: spacing[2],
                borderWidth: 1,
                backgroundColor: colors.neutral[800],
                color: colors.neutral[150]
              }}
              placeholder="Enter your 12-word seed phrase"
              textValue={textValue}
              setTextValue={setTextValue}
              editable={!submitting}
            />

            {errorText ? (
              <BaseText
                style={{
                  color: colors.red[400],
                  textAlign: 'center',
                  marginTop: spacing[2]
                }}
              >
                {errorText}
              </BaseText>
            ) : null}
          </ScrollView>

          <TouchableOpacity
            style={{
              backgroundColor: colors.gold[600],
              borderRadius: spacing[2],
              marginBottom: spacing[4],
              height: spacing[12],
              alignItems: 'center',
              justifyContent: 'center',
              opacity: submitting ? 0.4 : 1
            }}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <Spinner />
            ) : (
              <BaseText
                style={{
                  textAlign: 'center',
                  color: colors.neutral[0],
                  fontWeight: 600
                }}
              >
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
