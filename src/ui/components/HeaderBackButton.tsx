import React from 'react';

import IconButton, { IconButtonProps } from '@ui/components/IconButton';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from '@assets/icons';
import Icon from '@ui/components/Icon';
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
      onPress={() =>
        !customPressEvent ? navigation.goBack() : customPressEvent()
      }
      icon={<Icon as={BackIcon} color="base300" />}
      {...props}
    />
  );
};

export default HeaderBackButton;
