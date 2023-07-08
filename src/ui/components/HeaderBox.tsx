import * as React from 'react';
import {Platform} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import {Box, BoxProps} from '@ui/components';

type Props = BoxProps & {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

const ScreenHeaderBox = ({leftIcon, rightIcon, style, ...rest}: Props) => (
  <SafeAreaInsetsContext.Consumer>
    {insets => (
      <Box
        accessibilityRole="toolbar"
        flexDirection="row"
        alignItems="center"
        justifyContent={
          leftIcon && rightIcon
            ? 'space-between'
            : !leftIcon && rightIcon
            ? 'flex-end'
            : undefined
        }
        px="l"
        mb="xl"
        {...rest}
        style={[
          {
            marginTop:
              (insets?.top || 0) + Platform.select({default: 16, android: 24}),
          },
          style,
        ]}>
        {leftIcon}
        {rightIcon}
      </Box>
    )}
  </SafeAreaInsetsContext.Consumer>
);

export default ScreenHeaderBox;
