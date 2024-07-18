import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle[];
}

const defaultStyle = [{ paddingLeft: 24, paddingRight: 24 }];

const Container = ({ children, style = [], ...props }: ContainerProps) => {
  return (
    <View style={[defaultStyle, ...style]} {...props}>
      {children}
    </View>
  );
};

export default Container;
