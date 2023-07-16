import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {Box, BoxProps, Text} from '@ui/components';

type Props = BoxProps & {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  title?: string;
};

const ScreenHeaderBox = ({leftIcon, rightIcon, style, title, ...rest}: Props) => (
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
        {title && !leftIcon ? <Box px="m" /> : leftIcon}
        {title && <Text variant="subheadLargeBold">{title}</Text>}
        {title && !rightIcon ? <Box px="m" /> : rightIcon}
      </Box>
    )}
  </SafeAreaInsetsContext.Consumer>
);
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 16,
    shadowRadius: 10,
    shadowColor: 'rgba(47, 51, 80, 0.12)',
    shadowOpacity: 1,
  },
});

export default ScreenHeaderBox;
