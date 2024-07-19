import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { THEME } from '../constants/theme';

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle[];
}

const defaultStyle = [{ color: THEME.colors.neutral[150] }, { fontSize: 16 }];

const BaseText = ({ children, style = [], ...props }: BaseTextProps) => {
  return (
    <Text style={[defaultStyle, ...style]} {...props}>
      {children}
    </Text>
  );
};

export default BaseText;
