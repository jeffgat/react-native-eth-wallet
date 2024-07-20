import { Image } from 'expo-image';
import { useAtomValue } from 'jotai';
import { TouchableOpacity, View } from 'react-native';
import { TokenMetadata } from '../services/ethereum';
import { userAtom } from '../state/atoms';
import BaseText from '../ui/text';
import { THEME } from '../ui/theme';
import { formatNumberWithCommas } from '../utils/helpers';

type TokenProps = {
  token: TokenMetadata;
  handleTokenPress: (token: TokenMetadata) => void;
};

const Token = ({ token, handleTokenPress }: TokenProps) => {
  const { colors, textSize, spacing } = THEME;
  const user = useAtomValue(userAtom);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.neutral[800],
        padding: spacing[4],
        borderRadius: spacing[2],
        marginBottom: spacing[2],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      key={token.chain ? `${token.chain}_${token.abbr}` : token.abbr}
      onPress={() => handleTokenPress(token)}
      disabled={!user.encryptedPrivateKey}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image
            style={{
              borderRadius: 80,
              width: spacing[12],
              height: spacing[12],
              marginRight: spacing[4]
            }}
            source={
              token.image ||
              'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
            }
          />
          <Image
            style={{
              borderRadius: 80,
              width: spacing[5],
              height: spacing[5],
              position: 'absolute',
              bottom: 0,
              right: spacing[2],
              borderWidth: 2,
              borderColor: colors.neutral[800]
            }}
            source={
              token.chainImage ||
              'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
            }
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <BaseText style={{ fontWeight: 600, marginRight: 1 }}>
              {token.abbr}
            </BaseText>
            <BaseText
              style={{ color: colors.gold[200], fontSize: textSize.sm }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              (${formatNumberWithCommas(token.price)})
            </BaseText>
          </View>
          <BaseText
            style={{ opacity: 0.6 }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {token.name}
          </BaseText>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end'
        }}
      >
        <BaseText style={{ fontWeight: 600 }}>
          {parseFloat(token.balance).toFixed(4)}
        </BaseText>
        <BaseText
          style={{ opacity: 0.6 }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          ~ ${formatNumberWithCommas(token.usdBalance)} USD
        </BaseText>
      </View>
    </TouchableOpacity>
  );
};

export default Token;
