import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';

import Header from './src/components/HeaderBackButton';
import './src/polyfills/base64';
import ImportWalletScreen from './src/screens/ImportWalletScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ViewWalletScreen from './src/screens/ViewWalletScreen';
import { Screens } from './src/types/screens';
import WalletScreen from './src/screens/WalletScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name={Screens.Onboarding}
          component={OnboardingScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name={Screens.ImportWallet}
          component={ImportWalletScreen}
          options={{
            headerLeft: () => <Header />,
            headerTransparent: true
          }}
        />
        <Stack.Screen
          name={Screens.ViewWallet}
          component={ViewWalletScreen}
          options={{
            headerLeft: () => <Header />,
            headerTransparent: true
          }}
        />
        <Stack.Screen
          name={Screens.Wallet}
          component={WalletScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
