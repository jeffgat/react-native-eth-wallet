import { EvilIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Easing } from 'react-native-reanimated';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 24, color = 'white' }: SpinnerProps) => {
  return (
    <MotiView
      className="absolute"
      from={{ rotate: '0deg' }}
      animate={{ rotate: '360deg' }}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
        repeatReverse: false,
        easing: Easing.linear
      }}
    >
      <EvilIcons name="spinner-3" size={size} color={color} />
    </MotiView>
  );
};
export default Spinner;
