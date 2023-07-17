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
      <SafeAreaView
        style={[{flex: 0, backgroundColor: 'white'}, styles.shadow]}>
        <Box
          accessibilityRole="toolbar"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          px="m"
          mt="m"
          backgroundColor="white"
          {...rest}
          style={[style]}>
          {title && !leftIcon ? <Box px="m" /> : leftIcon}
          {title && (
            <Text
              mx={leftIcon && rightIcon ? 'm' : 'unset'}
              variant="subheadLargeBold">
              {title}
            </Text>
          )}
          {title && !rightIcon ? <Box px="m" /> : rightIcon}
        </Box>
      </SafeAreaView>
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
