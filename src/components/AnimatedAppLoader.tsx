import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

import AnimatedSplashScreen from './AnimatedSplashScreen';

interface Props {
  children: React.ReactNode;
}

export default function AnimatedAppLoader({ children }: Props) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Asset.fromModule(
          require('../assets/splash.png')
        ).downloadAsync();
      } catch (e) {
        console.warn('err', e);
      }
      setSplashReady(true);
    }

    prepare();
  }, []);

  if (!isSplashReady) {
  }

  return (
    <AnimatedSplashScreen image={require('../assets/splash.png')}>
      {children}
    </AnimatedSplashScreen>
  );
}
