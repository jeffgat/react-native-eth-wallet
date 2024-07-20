import { Image } from 'expo-image';
import { useAtomValue } from 'jotai';
import { TouchableOpacity, View } from 'react-native';
import { TokenMetadata } from '../services/ethereum';
import { userAtom } from '../state/atoms';
import BaseText from '../ui/text';
import { formatNumberWithCommas } from '../utils/helpers';

type TokenProps = {
  token: TokenMetadata;
  handleTokenPress: (token: TokenMetadata) => void;
};

const Token = ({ token, handleTokenPress }: TokenProps) => {
  const user = useAtomValue(userAtom);
  return (
    <TouchableOpacity
      className="bg-neutral-800 mb-2 p-4 rounded-lg flex-row justify-between items-center"
      key={token.chain ? `${token.chain}_${token.abbr}` : token.abbr}
      onPress={() => handleTokenPress(token)}
      disabled={!user.encryptedPrivateKey}
    >
      <View className="flex-row items-center">
        <View>
          <Image
            className="rounded-full w-12 h-12 mr-4"
            source={
              token.image ||
              'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
            }
            placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj' }}
          />
          <Image
            className="rounded-full w-5 h-5 absolute bottom-0 right-2 border-2 border-neutral-800"
            source={
              token.chainImage ||
              'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
            }
            placeholder={{ blurhash: 'L5H2EC=PM+yV0g-mq.wG9c010JIp0M%LxtRj' }}
          />
        </View>
        <View>
          <View className="flex-row">
            <BaseText className="font-semibold mr-1">{token.abbr}</BaseText>
            <BaseText
              className="text-sm text-gold-200"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              (${formatNumberWithCommas(token.price)})
            </BaseText>
          </View>
          <BaseText
            className="opacity-60"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {token.name}
          </BaseText>
        </View>
      </View>
      <View className="items-end justify-end">
        <BaseText className="font-semibold">
          {parseFloat(token.balance).toFixed(4)}
        </BaseText>
        <BaseText className="opacity-60" ellipsizeMode="tail" numberOfLines={1}>
          ~ ${formatNumberWithCommas(token.usdBalance)} USD
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};

export default Token;
