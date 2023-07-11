import * as React from 'react';
import {
  Animated,
  BackHandler,
  GestureResponderEvent,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppTheme} from '@theme';
import Color from 'color';

import useEventCallback from '@ui/hooks/useEventCallback';
import {AnimatedPressable, Box, BoxProps} from '@ui/components';

type Props = BoxProps &
  Pick<KeyboardAvoidingViewProps, 'behavior' | 'keyboardVerticalOffset'> & {
    children: React.ReactNode;
    /**
     * containerStyle
     */
    containerStyle?: StyleProp<ViewStyle>;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    backdropStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    /**
     * allow render Pressable component as backdrop
     */
    allowBackdrop?: boolean;
    /**
     * Called when backdrop its presset, pass event if you prevent goBack
     */
    onBackdropPress?: (event: GestureResponderEvent) => any;
    /**
     * Android press back button
     */
    onBackButtonPress?: () => void;
    /**
     * Called when unmount Modal
     */
    onDismiss?: () => void;
    /**
     * padding inset top
     */
    disablePaddingInsetTop?: boolean;
    /**
     * Add KeyboardAvoding to PFMModalWrapper
     */
    avoidKeyboard?: boolean;
    /**
     * disable Android back button
     */
    disableBackButton?: boolean;
    /**
     * Force to render container in KeyboardAvoidingView
     */
    enableAvoidKeyboardContainer?: boolean;
  };

function ModalWrapper({
  children,
  style,
  containerStyle,
  backdropStyle,
  allowBackdrop,
  disablePaddingInsetTop,
  avoidKeyboard,
  enableAvoidKeyboardContainer,
  disableBackButton,
  behavior,
  keyboardVerticalOffset,
  onDismiss,
  onBackdropPress,
  onBackButtonPress,
  ...rest
}: Props) {
  const {
    colors: {bodyOverlay},
  } = useAppTheme();
  const navigation = useNavigation();
  const handleDismiss = useEventCallback(onDismiss || (() => {}));
  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar
  const smallHeaderInset = statusBarInset; //+ 44;

  const handleBackdropPress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (!allowBackdrop) return;
      onBackdropPress?.(event);
      if (!event.defaultPrevented) {
        navigation.goBack();
      }
    },
    [navigation, onBackdropPress, allowBackdrop],
  );

  React.useLayoutEffect(() => {
    const onBackPress = () => {
      onBackButtonPress?.();
      return !!disableBackButton;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      Platform.OS === 'ios'
        ? requestAnimationFrame(() => {
            handleDismiss?.();
          })
        : handleDismiss?.();
    };
  }, []);

  const screenHeight = useWindowDimensions().height;
  const PFMmodalWrapperPosititionY = React.useRef(
    new Animated.Value(screenHeight),
  ).current;

  React.useEffect(() => {
    Animated.timing(PFMmodalWrapperPosititionY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  const colorOpacity = Color(bodyOverlay).alpha();
  const defaultBackdropStyle = {
    backgroundColor: bodyOverlay,
    opacity: colorOpacity,
  };
  const computedStyle = [
    styles.container,
    !disablePaddingInsetTop && {paddingBottom: smallHeaderInset},
    containerStyle,
  ];
  const modalChildren = (
    <Box
      as={Animated.View}
      style={[
        style,
        {
          transform: [
            {
              translateY: PFMmodalWrapperPosititionY,
            },
          ],
        },
      ]}
      width="85%"
      maxHeight="85%"
      borderRadius="l"
      maxWidth={500}
      bg="cards"
      _dark={{bg: 'backgrounds'}}
      {...rest}>
      {children}
    </Box>
  );

  return (
    <>
      <AnimatedPressable
        style={[styles.backdrop, defaultBackdropStyle, backdropStyle]}
        onPress={handleBackdropPress}
        testID="modal-backdrop"
      />
      {avoidKeyboard || enableAvoidKeyboardContainer ? (
        <KeyboardAvoidingView
          pointerEvents="box-none"
          behavior={behavior || (Platform.OS === 'ios' ? 'padding' : undefined)}
          style={computedStyle.concat([{margin: 0}])}
          enabled={avoidKeyboard}
          keyboardVerticalOffset={keyboardVerticalOffset}
          contentContainerStyle={containerStyle}>
          {modalChildren}
        </KeyboardAvoidingView>
      ) : (
        <View style={computedStyle} pointerEvents="box-none">
          {modalChildren}
        </View>
      )}
    </>
  );
}

ModalWrapper.defaultProps = {
  allowBackdrop: true,
  avoidKeyboard: false,
};

export default React.memo(ModalWrapper);

const styles = StyleSheet.create({
  // NOTE: backdrop color is setting in screen options in RootStack and custom hook
  backdrop: StyleSheet.absoluteFillObject,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
