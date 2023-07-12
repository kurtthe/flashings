import React from 'react';
import {StatusBar, StatusBarProps, Platform, View} from 'react-native';

import {useColorModeValue} from '@ui/hooks';

type Props = Omit<StatusBarProps, 'barStyle'> & {
  barStyle?: 'auto' | 'light-content' | 'dark-content';
  color?: string;
};

const AppStatusBar = ({barStyle = 'auto', color = 'white', ...rest}: Props) => {
  const autoStyle = useColorModeValue('dark-content', 'light-content');
  const statusBar = (
    <StatusBar
      backgroundColor={color}
      barStyle={barStyle === 'auto' ? autoStyle : barStyle}
    />
  )
  if (Platform.OS === 'ios') {
    return (
      <View style={{ backgroundColor: color, width: '100%', height: 60 }}>{statusBar}</View>
    )
  }
  return statusBar
};

export default AppStatusBar;

