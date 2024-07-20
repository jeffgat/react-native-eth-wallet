import { RouteProp } from '@react-navigation/native';
import { ethers } from 'ethers';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { useAtomValue } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { TOKEN_IMAGES } from '../constants/images';
import { providers } from '../constants/providers';
import { Screens } from '../routes/screens';
import {
  getGasPrice,
  sendTransaction,
  TokenMetadata
} from '../services/ethereum';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import Spinner from '../ui/spinner';
import BaseText from '../ui/text';
import BaseTextInput from '../ui/text-input';
import { decryptString } from '../utils/cryptography';
import { cn } from '../utils/helpers';
import { useAsyncData } from '../utils/hooks';

type RootStackParamList = {
  SendScreen: TokenMetadata;
};

type SendScreenRouteProp = RouteProp<RootStackParamList, 'SendScreen'>;

interface SendScreenProps {
  navigation: any;
  route: SendScreenRouteProp;
}
const SendScreen = ({ navigation, route }: SendScreenProps) => {
  const { params } = route;
  const user = useAtomValue(userAtom);
  const [txLoading, setTxLoading] = useState(false);
  const [addressInput, setAddressInput] = useState(
    '0xb00C4B4035b36c28286e8b7e806D13fBd7B2e585'
  );
  const [amountInput, setAmountInput] = useState('0.00');
  const [addressInputError, setAddressInputError] = useState('');
  const [amountInputError, setAmountInputError] = useState('');
  const [gasGwei, setGasGwei] = useState('0');
  const gasPrice = useCallback(() => {
    return getGasPrice(providers[params.chain]);
  }, []);

  const { data: gas } = useAsyncData(gasPrice);

  // effects
  useEffect(() => {
    if (gas && params.price) {
      setGasGwei(ethers.utils.formatUnits(gas.gasPrice, 'gwei'));
    }
  }, [gas]);

  // basic validation
  useEffect(() => {
    if (parseFloat(amountInput) > parseFloat(params.balance)) {
      setAmountInputError('Insufficient balance');
    } else {
      setAmountInputError('');
    }
  }, [amountInput]);
  useEffect(() => {
    if (!ethers.utils.isAddress(addressInput)) {
      setAddressInputError('Invalid address');
    } else {
      setAmountInputError('');
    }
  }, [addressInput]);

  // handlers
  const handleSend = async () => {
    if (!user.encryptedPrivateKey) {
      return console.log('no private key');
    }

    setTxLoading(true);
    const wallet = new ethers.Wallet(
      decryptString(user.encryptedPrivateKey),
      providers[params.chain]
    );

    try {
      await sendTransaction({
        toAddress: addressInput,
        wallet,
        amount: amountInput,
        gasPrice: gas.gasPrice
      });
      Toast.show({
        type: 'success',
        text1: `${amountInput} ${params.abbr} was sent to`,
        text2: addressInput,
        position: 'bottom'
      });
      navigation.navigate(Screens.Wallet);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Transaction failed',
        text2: err.message || 'Uknown error',
        position: 'bottom'
      });
    }
    setTxLoading(false);
  };

  // probably clean this validation up, and write a test for it
  const disableButtonConditions =
    txLoading ||
    amountInput === '' ||
    !!amountInputError ||
    !!addressInputError ||
    !gas ||
    parseFloat(params.balance) < parseFloat(amountInput) ||
    parseFloat(amountInput) <= 0 ||
    isNaN(Number(amountInput));

  if (!params || !user.encryptedPrivateKey) {
    return navigation.navigate(Screens.Wallet);
  }

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
        <Container className="justify-between flex-1">
          <BaseText className="text-center text-2xl font-bold mx-auto mb-4">
            Send
          </BaseText>
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-row">
                <View>
                  <Image
                    className="rounded-full w-12 h-12 mr-4"
                    source={params.image || TOKEN_IMAGES.eth}
                    placeholder={{
                      blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj'
                    }}
                  />
                  <Image
                    className="rounded-full w-5 h-5 absolute bottom-0 right-2 border-2 border-neutral-800"
                    source={params.chainImage || TOKEN_IMAGES.eth}
                    placeholder={{
                      blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj'
                    }}
                  />
                </View>
                <View>
                  <BaseText className="font-semibold">{params.abbr}</BaseText>
                  <BaseText
                    className="opacity-60"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {params.name}
                  </BaseText>
                </View>
              </View>
              <View className="items-end">
                <BaseText className="">Network Fee</BaseText>
                <BaseText className="opacity-70">
                  {parseFloat(gasGwei).toFixed(4)} gwei
                </BaseText>
              </View>
            </View>
            <BaseTextInput
              className={cn(
                'h-12 px-2 text-neutral-150 bg-neutral-800 rounded-md mt-2 border items-center w-full',
                addressInputError && 'border-red-400'
              )}
              textValue={addressInput}
              setTextValue={setAddressInput}
              placeholder="Enter the address you would like to send to"
            />

            <BaseTextInput
              className={cn(
                'h-12 px-2 text-neutral-150 bg-neutral-800 rounded-md mt-2 border items-center w-full',
                amountInputError && 'border-red-400'
              )}
              textValue={amountInput}
              setTextValue={setAmountInput}
              placeholder="Amount"
              keyboardType="decimal-pad"
            />

            <View className="flex-row justify-between py-4">
              <BaseText className="opacity-70">
                ~ ${(parseFloat(amountInput) * params.price || 0).toFixed(2)}
              </BaseText>

              <View className="flex-row">
                <BaseText className="mr-2">Available</BaseText>
                <View className="items-end">
                  <BaseText className="opacity-70">
                    {`${parseFloat(params.balance).toFixed(4)} ${params.abbr}`}
                  </BaseText>
                </View>
              </View>
            </View>
            <View className="items-center">
              {amountInputError ? (
                <BaseText className="text-red-400 text-center py-1">
                  {amountInputError}
                </BaseText>
              ) : null}
              {addressInputError ? (
                <BaseText className="text-red-400 text-center py-1">
                  {addressInputError}
                </BaseText>
              ) : null}
            </View>
          </ScrollView>

          {/* txLoading */}
          <TouchableOpacity
            className={cn(
              'mb-4 rounded-md bg-gold-600 h-12 items-center justify-center flex',
              disableButtonConditions && 'opacity-40'
            )}
            onPress={handleSend}
            disabled={disableButtonConditions}
          >
            {txLoading ? (
              <Spinner />
            ) : (
              <BaseText className="text-center text-white font-bold">
                Continue
              </BaseText>
            )}
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SendScreen;
