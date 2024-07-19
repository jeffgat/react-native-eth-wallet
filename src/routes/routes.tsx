import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import Header from '../components/HeaderBackButton';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SendScreen from '../screens/SendScreen';
import ViewWalletScreen from '../screens/ViewWalletScreen';
import WalletScreen from '../screens/WalletScreen';
import { toastConfig } from '../ui/toast-config';
import { Screens } from './screens';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Group
          screenOptions={{
            headerLeft: () => <Header />,
            headerTitle: () => '',
            headerBackVisible: false,
            headerTransparent: true
          }}
        >
          <Stack.Screen
            name={Screens.ImportWallet}
            component={ImportWalletScreen}
          />
          <Stack.Screen
            name={Screens.ViewWallet}
            component={ViewWalletScreen}
          />
          <Stack.Screen name={Screens.Send} component={SendScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name={Screens.Onboarding}
            component={OnboardingScreen}
          />
          <Stack.Screen name={Screens.Wallet} component={WalletScreen} />
        </Stack.Group>
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Routes;
