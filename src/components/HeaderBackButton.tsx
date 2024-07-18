import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { THEME } from '../config/theme';

type Props = {};

const Header = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Entypo name="chevron-left" size={32} color={THEME.colors.neutral[150]} />
    </TouchableOpacity>
  );
};

export default Header;
