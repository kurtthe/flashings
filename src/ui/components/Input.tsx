import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {
  backgroundColor,
  border,
  color,
  composeRestyleFunctions,
  createRestyleFunction,
  createVariant,
  layout,
  opacity,
  spacing,
  typography,
} from '@shopify/restyle';
import {useAppRestyle} from '@theme';
import {useAsProp, useFontStyle} from '@ui/hooks';
import {forwardRef} from '@ui/utils';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
import {useIsDarkMode} from '@theme/hooks';
import Box from '@ui/components/Box';
import Text from '@ui/components/Text';
import {isTablet} from '@shared/platform';

import type {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  OpacityProps,
  SpacingProps,
  TypographyProps,
  VariantProps,
} from '@shopify/restyle';
import type {Theme} from '@theme';

export type RestyleInputProps = VariantProps<Theme, 'inputVariants'> &
  TypographyProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  OpacityProps<Theme> &
  TextInputProps & {
    isDisabled?: boolean;
    isInvalid?: boolean;
    rightIcon?: ReactElement;
    name?: string;
    onChangeValue?: (() => Promise<any> | void) | Function | null;
    autoCompleteType?:
      | 'password'
      | 'email'
      | 'street-address'
      | 'name'
      | 'cc-csc'
      | 'tel';
    label?: string | null;
    styleContent?: TextStyle;
    isRequired?: boolean;
    suffix?: string;
  };

export type InputProps = RestyleInputProps & {
  _dark?: RestyleInputProps;
  _light?: RestyleInputProps;
};

const variant = createVariant({themeKey: 'inputVariants'});
const inputPlaceholderTextColor = createRestyleFunction({
  themeKey: 'colors',
  property: 'placeholderTextColor',
});
const inputSelectionColor = createRestyleFunction({
  themeKey: 'colors',
  property: 'selectionColor',
});

const restyleFunctions = composeRestyleFunctions([
  color,
  opacity,
  backgroundColor,
  spacing,
  layout,
  border,
  typography,
  inputSelectionColor,
  inputPlaceholderTextColor,
  variant,
]);

const Input = forwardRef<InputProps, typeof TextInput>(
  (
    {
      isRequired = false,
      suffix,
      value,
      label,
      isDisabled,
      isInvalid,
      editable,
      rightIcon,
      style,
      variant: inputVariant = undefined,
      as,
      _dark,
      _light,
      onBlur,
      onFocus,
      placeholder,
      onEndEditing,
      styleContent,
      ...rest
    },
    ref,
  ) => {
    const BaseInputComponent = useAsProp(TextInput, as);
    const isDarkMode = useIsDarkMode();
    const internalRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const labelAnimation = useMemo(
      () => new Animated.Value(!!value || !!placeholder || isFocused ? 1 : 0),
      [value, placeholder, isFocused],
    );

    const refs = useCombinedRefs(internalRef, ref);

    let _inputVariant = useMemo(() => {
      if (isFocused) return 'focused';
      if (isDisabled) return 'disabled';
      if (isInvalid) return 'error';
      return inputVariant;
    }, [isFocused, isDisabled, isInvalid, inputVariant]);

    const {
      style: [{selectionColor, ...containerStyle}],
      ...props
    } = useAppRestyle<
      InputProps,
      Pick<TextInputProps, 'placeholderTextColor' | 'selectionColor'>
    >(restyleFunctions, {
      variant: _inputVariant,
      ...rest,
      ...(isDarkMode ? _dark : _light),
    });

    const fontStyle = useFontStyle(containerStyle as TextStyle);
    const isFocusable = !!editable || !isDisabled;

    const handleFocus = useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(ev);
        setIsFocused(true);
        Animated.timing(labelAnimation, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      },
      [onFocus, labelAnimation],
    );

    const handleBlur = useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(ev);
        setIsFocused(false);
        Animated.timing(labelAnimation, {
          toValue: value || placeholder ? 1 : 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      },
      [onBlur, labelAnimation, value, placeholder],
    );

    const handleExternalFocus = useCallback(() => {
      if (isFocusable) {
        internalRef.current?.focus();
      }
    }, [isFocusable]);

    return (
      <Pressable
        style={StyleSheet.flatten([
          styles.inputContainer,
          style,
          containerStyle,
        ])}
        onPress={handleExternalFocus}
        accessible={false}>
        <Box flexDirection="row" alignItems="center">
          <Box flex={1}>
            <Text
              as={Animated.Text}
              position="absolute"
              color="grey400"
              style={{
                top: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [isTablet ? 25 : 18, isTablet ? 10 : 5],
                }),
                fontSize: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [isTablet ? 18 : 16, isTablet ? 18 : 14],
                }),
                textTransform: 'capitalize',
              }}>
              {label}
              {isRequired && <Text color="error500">*</Text>}
            </Text>

            <BaseInputComponent
              ref={refs}
              style={[
                styles.text,
                fontStyle,
                {
                  paddingTop:
                    value || placeholder || isFocused
                      ? isTablet
                        ? 28
                        : 20
                      : 0,
                  marginTop: isTablet ? 12 : 0,
                  fontWeight: value || placeholder || isFocused ? '700' : '500',
                  paddingHorizontal: 0,
                },
                styleContent,
              ]}
              selectionColor={selectionColor}
              editable={!isDisabled}
              {...props}
              value={value}
              placeholder={placeholder}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </Box>
          {suffix && (
            <Box
              top={value || placeholder || isFocused ? 3 : isTablet ? 14 : 8}
              right={5}>
              <Text
                mt={label ? 's' : 'unset'}
                variant="bodyRegular"
                color="lightGray">
                {suffix}
              </Text>
            </Box>
          )}
          {rightIcon && (
            <Box top={value || placeholder || isFocused ? 7 : 12} right={5}>
              {rightIcon}
            </Box>
          )}
        </Box>
      </Pressable>
    );
  },
);

Input.defaultProps = {
  placeholderTextColor: 'textPlaceholder',
  caretHidden: false,
  maxFontSizeMultiplier: 1.3,
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 60,
  },
  text: {
    lineHeight: 20,
    marginTop: isTablet ? 10 : 8,
  },
});
