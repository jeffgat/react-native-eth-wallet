import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import AnimatedAppLoader from './src/components/AnimatedAppLoader';
import './src/polyfills/base64';
import Routes from './src/routes/routes';
import { toastConfig } from './src/ui/toast-config';


export default function App() {
  return (
    <AnimatedAppLoader>
      <GestureHandlerRootView>
        <Routes />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </AnimatedAppLoader>
  );
}
