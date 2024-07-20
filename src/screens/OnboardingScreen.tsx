import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Screens } from '../routes/screens';
import { userAtom } from '../state/atoms';
import Container from '../ui/container';
import BaseText from '../ui/text';
import { THEME } from '../ui/theme';

const OnboardingScreen = ({ navigation }) => {
  const user = useAtomValue(userAtom);
  const { colors, textSize, spacing } = THEME;

  // effects
  useEffect(() => {
    if (user.privateKey || user.publicAddress) {
      navigation.navigate(Screens.Wallet);
    }
  }, [user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.neutral[900],
        justifyContent: 'center'
      }}
    >
      <Container>
        <BaseText
          style={{
            textAlign: 'center',
            fontSize: textSize['2xl'],
            fontWeight: 700
          }}
        >
          Select an option
        </BaseText>

        <TouchableOpacity
          style={{
            backgroundColor: colors.neutral[800],
            padding: spacing[4],
            borderRadius: spacing[2],
            marginTop: spacing[4]
          }}
          onPress={() => navigation.navigate(Screens.ImportWallet)}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: spacing[2]
            }}
          >
            <MaterialCommunityIcons
              name="import"
              size={22}
              color={THEME.colors.gold[600]}
            />
            <BaseText
              style={{
                fontWeight: 700,
                fontSize: textSize['lg'],
                marginLeft: spacing[1]
              }}
            >
              Import a wallet
            </BaseText>
          </View>
          <BaseText style={{ opacity: 0.7 }}>
            Enter your recovery phase to send transactions
          </BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.neutral[800],
            padding: spacing[4],
            borderRadius: spacing[2],
            marginTop: spacing[4]
          }}
          onPress={() => navigation.navigate(Screens.ViewWallet)}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: spacing[2]
            }}
          >
            <MaterialCommunityIcons
              name="eye"
              size={22}
              color={THEME.colors.gold[600]}
            />
            <BaseText
              style={{
                fontWeight: 700,
                fontSize: textSize['lg'],
                marginLeft: spacing[1]
              }}
            >
              View a wallet
            </BaseText>
          </View>
          <BaseText
            style={{
              opacity: 0.7
            }}
          >
            Enter a wallet address to view its token balances
          </BaseText>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
