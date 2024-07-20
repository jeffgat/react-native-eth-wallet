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

const ViewWalletScreen = ({ navigation }) => {
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
    if (!ethers.utils.isAddress(addressInput) && addressInput.length > 0) {
      setAddressInputError('Invalid address');
    } else {
      setAddressInputError('');
    }
  }, [addressInput]);

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
              Enter a wallet address
            </BaseText>
            <BaseText className="text-center font-medium opacity-60 mx-auto">
              You will be only be able to see the assets in this wallet. You
              will not be able to send transactions until you import your
              12-word seed phrase.
            </BaseText>
            <BaseTextInput
              className="h-12 px-2 text-neutral-150 bg-neutral-800 rounded-md mt-4 border items-center"
              textValue={addressInput}
              setTextValue={setAddressInput}
              placeholder="Wallet address"
            />
            {addressInputError ? (
              <BaseText className="text-red-400 text-center py-1 mt-2">
                {addressInputError}
              </BaseText>
            ) : null}
            <ScrollView horizontal></ScrollView>
          </ScrollView>

          <TouchableOpacity
            className="px-4 mb-2 rounded-md border border-gold-300 h-12 items-center justify-center flex"
            onPress={() =>
              setAddressInput('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
            }
          >
            <BaseText className="text-center text-gold-300 font-bold">
              {`Autofill with Vitalik's address`}
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            className="mb-4 rounded-md bg-gold-600 h-12 items-center justify-center flex"
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
