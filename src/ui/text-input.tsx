import React, { useState } from 'react';
import { Keyboard, TextInput, TextInputProps, TextStyle } from 'react-native';
import { THEME } from '../constants/theme';

interface BaseTextInputProps extends TextInputProps {
  textValue: string;
  setTextValue: (text: string) => void;
  style?: TextStyle[];
}

const BaseTextInput = ({
  textValue,
  setTextValue,
  style = [],
  ...props
}: BaseTextInputProps) => {
  const [inputFocused, setInputFocused] = useState(false);

  const defaultStyle = [
    {
      borderColor: inputFocused ? THEME.colors.gold[500] : 'transparent'
    }
  ];
  return (
    <TextInput
      style={[defaultStyle, ...style]}
      {...props}
      placeholderTextColor={THEME.colors.neutral[550]}
      autoCapitalize="none"
      returnKeyType="done"
      value={textValue}
      blurOnSubmit
      onSubmitEditing={() => Keyboard.dismiss()}
      onChangeText={setTextValue}
      onFocus={() => setInputFocused(true)}
      onEndEditing={() => setInputFocused(false)}
    />
  );
};

export default BaseTextInput;
