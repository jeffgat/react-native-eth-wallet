import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { THEME } from '../ui/theme';
import { Screens } from '../routes/screens';
import { totalBalanceAtom, userAtom } from '../state/atoms';
import BaseText from '../ui/text';

const LogoutSheet = ({ navigation, sheetRef }) => {
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
      <View className="flex-1 items-center bg-neutral-850 p-4">
        <MaterialCommunityIcons
          name="delete-circle"
          size={50}
          color={THEME.colors.red[500]}
        />
        <BaseText className="text-xl font-medium mb-2 mt-1">
          Wipe the data from your device?
        </BaseText>
        <BaseText className="opacity-70 text-center">
          Any private keys or public addresses will be removed from this device.
          You can always import them again.
        </BaseText>
        <View className="mt-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => handleClosePress()}
            className="flex-1 px-3 py-2 rounded-md flex-row items-center justify-center mr-2 border border-neutral-150"
          >
            <BaseText className="text-neutral-150 text-lg font-medium ml-1">
              Cancel
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-1 px-3 py-2 rounded-md flex-row items-center justify-center mr-2 border border-red-500 bg-red-500"
          >
            <BaseText className="text-white text-lg font-medium ml-1">
              Continue
            </BaseText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default LogoutSheet;
