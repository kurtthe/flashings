import React from 'react';

import IconButton, {IconButtonProps} from '@ui/components/IconButton';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '@assets/icons';
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
  const navigation = useNavigation();
  return (
    <IconButton
      onPress={() => navigation.goBack()}
      icon={<BackIcon />}
      {...props}
    />
  );
};

export default HeaderBackButton;
