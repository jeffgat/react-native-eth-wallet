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
import { THEME } from '../ui/theme';
import { decryptString } from '../utils/cryptography';
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
  const { colors, textSize, spacing } = THEME;
  const user = useAtomValue(userAtom);
  const [txLoading, setTxLoading] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [amountInput, setAmountInput] = useState('0');
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
    if (!ethers.utils.isAddress(addressInput) && addressInput.length >= 42) {
      setAddressInputError('Invalid address');
    } else {
      setAddressInputError('');
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

  // redirect
  if (!params || !user.encryptedPrivateKey) {
    Toast.show({
      type: 'error',
      text1: 'Unable to fetch info',
      text2: 'Please import your wallet again',
      position: 'bottom'
    });
    return navigation.navigate(Screens.Wallet);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
        <Container style={{ flex: 1, justifyContent: 'space-between' }}>
          <BaseText
            style={{
              textAlign: 'center',
              fontSize: textSize['2xl'],
              fontWeight: 700,
              marginBottom: spacing[4]
            }}
          >
            Send
          </BaseText>
          <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing[2]
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image
                    style={{
                      borderRadius: 100,
                      width: spacing[12],
                      height: spacing[12],
                      marginRight: spacing[4]
                    }}
                    source={params.image || TOKEN_IMAGES.eth}
                    placeholder={{
                      blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj'
                    }}
                  />
                  <Image
                    style={{
                      borderRadius: 100,
                      width: spacing[5],
                      height: spacing[5],
                      position: 'absolute',
                      bottom: 0,
                      right: spacing[2],
                      borderWidth: 2,
                      borderColor: colors.neutral[900]
                    }}
                    source={params.chainImage || TOKEN_IMAGES.eth}
                    placeholder={{
                      blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj'
                    }}
                  />
                </View>
                <View>
                  <BaseText style={{ fontWeight: 600 }}>{params.abbr}</BaseText>
                  <BaseText
                    style={{
                      opacity: 0.6
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {params.name}
                  </BaseText>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'flex-end'
                }}
              >
                <BaseText>Network Fee</BaseText>
                <BaseText
                  className="opacity-70"
                  style={{
                    opacity: 0.6
                  }}
                >
                  {parseFloat(gasGwei).toFixed(4)} gwei
                </BaseText>
              </View>
            </View>
            <BaseTextInput
              style={{
                height: spacing[12],
                padding: spacing[2],
                borderWidth: 1,
                backgroundColor: colors.neutral[800],
                color: colors.neutral[150],
                width: '100%',
                marginTop: spacing[2],
                borderColor: addressInputError ? colors.red[400] : 'transparent'
              }}
              textValue={addressInput}
              setTextValue={setAddressInput}
              placeholder="Enter the address you would like to send to"
            />

            <BaseTextInput
              style={{
                height: spacing[12],
                padding: spacing[2],
                borderWidth: 1,
                backgroundColor: colors.neutral[800],
                color: colors.neutral[150],
                width: '100%',
                marginTop: spacing[2],
                borderColor: amountInputError ? colors.red[400] : 'transparent'
              }}
              textValue={amountInput}
              setTextValue={setAmountInput}
              placeholder="Amount"
              keyboardType="decimal-pad"
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: spacing[4],
                paddingBottom: spacing[4]
              }}
            >
              <BaseText style={{ opacity: 0.6 }}>
                ~ ${(parseFloat(amountInput) * params.price || 0).toFixed(2)}
              </BaseText>

              <View style={{ flexDirection: 'row' }}>
                <BaseText style={{ marginRight: spacing[2] }}>
                  Available
                </BaseText>
                <View style={{ alignItems: 'flex-end' }}>
                  <BaseText style={{ opacity: 0.6 }}>
                    {`${parseFloat(params.balance).toFixed(4)} ${params.abbr}`}
                  </BaseText>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              {amountInputError ? (
                <BaseText
                  style={{
                    color: colors.red[400],
                    textAlign: 'center',
                    paddingTop: spacing[1],
                    paddingBottom: spacing[1]
                  }}
                >
                  {amountInputError}
                </BaseText>
              ) : null}
              {addressInputError ? (
                <BaseText
                  style={{
                    color: colors.red[400],
                    textAlign: 'center',
                    paddingTop: spacing[1],
                    paddingBottom: spacing[1]
                  }}
                >
                  {addressInputError}
                </BaseText>
              ) : null}
            </View>
          </ScrollView>

          {/* txLoading */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.gold[600],
              borderRadius: spacing[2],
              marginBottom: spacing[4],
              height: spacing[12],
              alignItems: 'center',
              justifyContent: 'center',
              opacity: disableButtonConditions ? 0.4 : 1
            }}
            onPress={handleSend}
            disabled={disableButtonConditions}
          >
            {txLoading ? (
              <Spinner />
            ) : (
              <BaseText
                style={{
                  fontWeight: 700,
                  textAlign: 'center',
                  color: colors.neutral[0]
                }}
              >
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
