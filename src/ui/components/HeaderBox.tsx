import * as React from 'react';
import {Platform, Text} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import {Box, BoxProps} from '@ui/components';

type Props = BoxProps & {
  leftIcon?: React.ReactElement;
  centerText?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

const ScreenHeaderBox = ({leftIcon, rightIcon, centerText, style, ...rest}: Props) => (
  <SafeAreaInsetsContext.Consumer>
    {insets => (
      <Box
        accessibilityRole="toolbar"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={60}
        px="l"
        mb="xl"
        {...rest}
        style={[
          {
            backgroundColor: 'white',
            shadowColor: 'gray',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.15,
            elevation: 1,
          },
          style,
        ]}>
        {centerText && !leftIcon ? <Box px="m" /> : leftIcon}
        {centerText}
        {centerText && !rightIcon ? <Box px="m" /> : rightIcon}
      </Box>
    )}
  </SafeAreaInsetsContext.Consumer>
);

export default ScreenHeaderBox;
