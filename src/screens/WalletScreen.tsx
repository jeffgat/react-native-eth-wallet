import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import TokenList from '../components/TokenList';
import { walletAddressAtom } from '../state/global';
import Container from '../ui/container';
import BaseText from '../ui/text';

const WalletScreen = ({ navigation }) => {
  const walletAddress = useAtomValue(walletAddressAtom);

  const handleCopy = () => {
    console.log('copied');
  };
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <Container className='flex-1'>
        <View className="mb-4">
          <TouchableOpacity onPress={handleCopy}>
            <BaseText
              className="font-medium my-4 w-1/2 text-lg"
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {walletAddress}
            </BaseText>
          </TouchableOpacity>
          <View className="flex-row items-center mb-2">
            <BaseText className="font-medium uppercase text-sm opacity-60">
              Total Balance
            </BaseText>
            <View className="bg-neutral-800 ml-2 px-3 rounded-full">
              <BaseText className="text-sm font-medium">USD</BaseText>
            </View>
          </View>
          <BaseText className="font-bold uppercase text-4xl">$114.55</BaseText>
        </View>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            onPress={handleCopy}
            className="bg-neutral-150 p-3 rounded-md flex-row items-center justify-center flex-1 mr-2"
          >
            <Feather name="send" size={28} color="black" />
            <BaseText className="text-black text-lg font-medium ml-1">
              Send
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCopy}
            className="bg-neutral-150 p-3 rounded-md flex-row items-center justify-center flex-1 mr-2"
          >
            <MaterialIcons name="call-received" size={28} color="black" />
            <BaseText className="text-black text-lg font-medium ml-1">
              Receive
            </BaseText>
          </TouchableOpacity>
        </View>

        <TokenList />
      </Container>
    </SafeAreaView>
  );
};

export default WalletScreen;
