import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton, {IconButtonProps} from '@ui/components/IconButton';
import {useNavigation} from '@react-navigation/native';
type Props = Omit<IconButtonProps, 'icon'> & {
  popToTop?: boolean;
  variant?: 'light';
  customPressEvent?: Function | (() => void);
};

const HeaderBackButton = ({
  variant = 'light',
  popToTop,
  customPressEvent,
  ...props
}: Props) => {
  return (
    <IconButton
      onPress={() => null}
      icon={<Ionicons name="arrow-back" size={20} color="black" />}
      {...props}
    />
  );
};

export default HeaderBackButton;
