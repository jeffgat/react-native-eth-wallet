import { ethers } from 'ethers';
import Constants from 'expo-constants';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import BaseText from '../ui/text';
import BaseTextInput from '../ui/text-input';
import { Screens } from '../routes/screens';

const ViewWalletScreen = ({ navigation }) => {
  const [textValue, setTextValue] = useState('');
  const [user, setUser] = useAtom(userAtom);

  const handleSubmit = () => {
    if (!ethers.utils.isAddress(textValue)) {
      return console.log('invalid address');
    }

    setUser({ ...user, publicAddress: textValue });
    navigation.navigate(Screens.Wallet);
  };
  // 0x616Ef1d3cB066BC4e5Ea0fbD06b4055F757c461A
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
              className="h-12 px-2 text-lg text-neutral-150 bg-neutral-800 rounded-md mt-4 border items-center"
              textValue={textValue}
              setTextValue={setTextValue}
              placeholder="Wallet address"
            />
            <ScrollView horizontal>
              <TouchableOpacity
                className="px-4 my-4 rounded-md border border-gold-300 h-12 items-center justify-center flex"
                onPress={() =>
                  setTextValue('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
                }
              >
                <BaseText className="text-center text-gold-300 font-bold">
                  {`Check out Vitalik's wallet`}
                </BaseText>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

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
