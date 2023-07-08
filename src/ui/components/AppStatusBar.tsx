import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

import {useColorModeValue} from '@ui/hooks';

type Props = Omit<StatusBarProps, 'barStyle'> & {
  barStyle?: 'auto' | 'light-content' | 'dark-content';
};

const AppStatusBar = ({barStyle = 'auto', ...rest}: Props) => {
  const autoStyle = useColorModeValue('dark-content', 'light-content');
  return (
    <StatusBar
      barStyle={barStyle === 'auto' ? autoStyle : barStyle}
      {...rest}
    />
  );
};

export default AppStatusBar;
