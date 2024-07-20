import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Screens } from '../routes/screens';
import { totalBalanceAtom, userAtom } from '../state/atoms';
import BaseText from '../ui/text';
import { THEME } from '../ui/theme';

const LogoutSheet = ({ navigation, sheetRef }) => {
  const { colors, textSize, spacing } = THEME;
  const setTotalBalance = useSetAtom(totalBalanceAtom);
  const setUser = useSetAtom(userAtom);
  const snapPoints = useMemo(() => ['25%', '33%'], []);

  // handlers
  const handleClosePress = () => sheetRef.current.close();

  const handleLogout = async () => {
    setTotalBalance(null);
    setUser({
      encryptedPrivateKey: null,
      publicAddress: null
    });
    handleClosePress();
    navigation.navigate(Screens.Onboarding);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: THEME.colors.neutral[850] }}
      handleIndicatorStyle={{ backgroundColor: THEME.colors.neutral[700] }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: THEME.colors.neutral[850],
          padding: spacing[4]
        }}
      >
        <MaterialCommunityIcons
          name="delete-circle"
          size={50}
          color={THEME.colors.red[500]}
        />
        <BaseText
          style={{
            fontSize: textSize['xl'],
            fontWeight: 500,
            marginBottom: spacing[2],
            marginTop: spacing[1]
          }}
        >
          Wipe the data from your device?
        </BaseText>
        <BaseText style={{ opacity: 0.6, textAlign: 'center' }}>
          Any private keys or public addresses will be removed from this device.
          You can always import them again.
        </BaseText>
        <View
          style={{
            flexDirection: 'row',
            marginTop: spacing[4],
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => handleClosePress()}
            style={{
              flex: 1,
              paddingTop: spacing[2],
              paddingBottom: spacing[2],
              paddingLeft: spacing[3],
              paddingRight: spacing[3],
              borderRadius: spacing[2],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing[2],
              borderWidth: 1,
              borderColor: colors.neutral[150]
            }}
          >
            <BaseText
              style={{
                color: colors.neutral[150],
                fontSize: textSize['lg'],
                fontWeight: '500',
                marginLeft: spacing[1]
              }}
            >
              Cancel
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flex: 1,
              paddingTop: spacing[2],
              paddingBottom: spacing[2],
              paddingLeft: spacing[3],
              paddingRight: spacing[3],
              borderRadius: spacing[2],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing[2],
              borderWidth: 1,
              borderColor: colors.red[500],
              backgroundColor: colors.red[500]
            }}
          >
            <BaseText
              style={{
                color: colors.neutral[0],
                fontSize: textSize['lg'],
                fontWeight: '500',
                marginLeft: spacing[1]
              }}
            >
              Continue
            </BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default LogoutSheet;
