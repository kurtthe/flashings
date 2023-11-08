import * as React from 'react';
import { Platform, StyleSheet } from "react-native";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {Box, BoxProps, Text} from '@ui/components';

export type ScreenHeaderBoxProps = BoxProps & {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  title?: string;
  maxLength?:number
};

const ScreenHeaderBox = ({
  leftIcon,
  rightIcon,
  style,
  title,
  maxLength = 35,
  ...rest
}: ScreenHeaderBoxProps) => (
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
          style={[styles.container, { marginTop: (insets?.top || 0) + Platform.select({ ios: 16, default: 24 }), paddingVertical: Platform.select({android:15})}, style]}>
          {title && !leftIcon ? <Box px="m" /> : leftIcon}
          {title && <Text numberOfLines={1}  variant="subheadLargeBold">
            {(title.length < maxLength || !maxLength)
                ? `${title}`
                : `${title.substring(0, maxLength)}...`}
          </Text>}
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
  container: {
    zIndex: 1,
  },
});

export default ScreenHeaderBox;
