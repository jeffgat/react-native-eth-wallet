import { ethers } from 'ethers';
import Constants from 'expo-constants';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Screens } from '../routes/screens';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import BaseText from '../ui/text';
import BaseTextInput from '../ui/text-input';
import { THEME } from '../ui/theme';

const ViewWalletScreen = ({ navigation }) => {
  const { colors, textSize, spacing } = THEME;
  const [addressInput, setAddressInput] = useState('');
  const [addressInputError, setAddressInputError] = useState('');
  const [user, setUser] = useAtom(userAtom);

  // handlers
  const handleSubmit = () => {
    if (!ethers.utils.isAddress(addressInput)) {
      return;
    }
    setUser({ ...user, publicAddress: addressInput });
    navigation.navigate(Screens.Wallet);
  };

  // effects
  useEffect(() => {
    if (!ethers.utils.isAddress(addressInput) && addressInput.length >= 42) {
      setAddressInputError('Invalid address');
    } else {
      setAddressInputError('');
    }
  }, [addressInput]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              Enter a wallet address
            </BaseText>
            <BaseText
              style={{
                fontWeight: 500,
                opacity: 0.6,
                textAlign: 'center'
              }}
            >
              You will be only be able to see the assets in this wallet. You
              will not be able to send transactions until you import your
              12-word seed phrase.
            </BaseText>
            <BaseTextInput
              style={{
                marginTop: spacing[4],
                height: spacing[12],
                padding: spacing[2],
                borderWidth: 1,
                backgroundColor: colors.neutral[800],
                color: colors.neutral[150]
              }}
              textValue={addressInput}
              setTextValue={setAddressInput}
              placeholder="Wallet address"
            />
            {addressInputError ? (
              <BaseText
                style={{
                  color: colors.red[400],
                  textAlign: 'center',
                  marginTop: spacing[2]
                }}
              >
                {addressInputError}
              </BaseText>
            ) : null}
          </ScrollView>

          <TouchableOpacity
            style={{
              borderRadius: spacing[2],
              borderWidth: 1,
              borderColor: colors.gold[300],
              marginBottom: spacing[2],
              height: spacing[12],
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() =>
              setAddressInput('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
            }
          >
            <BaseText
              style={{
                textAlign: 'center',
                color: colors.gold[300],
                fontWeight: 500
              }}
            >
              Autofill with Vitalik's address
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.gold[600],
              borderRadius: spacing[2],
              marginBottom: spacing[4],
              height: spacing[12],
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={handleSubmit}
          >
            <BaseText
              style={{
                textAlign: 'center',
                color: colors.neutral[0],
                fontWeight: 600
              }}
            >
              Continue
            </BaseText>
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ViewWalletScreen;
