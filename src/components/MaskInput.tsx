import React, { useCallback, useRef } from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
  StyleSheet,
  Animated,
  TextStyle,
  TextInputProps,
} from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { useCombinedRefs } from '@hooks/useCombinedRefs';
import { Box, InputProps } from '@ui/components';
import Text from '@ui/components/Text';
import { useFontStyle } from '@ui/hooks';
import { getKeys } from '@ui/utils';
import { color, typography } from '@shopify/restyle';
import { useAppRestyle } from '@theme';
import { restyleFunctions, RestyleInputProps } from '@ui/components/Input';
import { useIsDarkMode } from '@theme/hooks';

type Props = RestyleInputProps &
  MaskInputProps & {
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
  };

const inputStyleProperties = [...typography, ...color].map(
  ({ property }) => property as string,
);

const MaskInputComponent = React.forwardRef<typeof TextInput, Props>(
  (
    {
      label,
      value,
      onChangeText,
      onBlur,
      onFocus,
      variant: inputVariant = undefined,
      placeholder,
      isRequired,
      ...rest
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string>();
    const internalRef = React.createRef<TextInput>();
    const labelAnimationRef = useRef(
      new Animated.Value(!!value ? 1 : 0),
    ).current;
    const refs = useCombinedRefs(internalRef, ref);

    const {
      style: [{ selectionColor, ...containerStyle }],
      ...props
    } = useAppRestyle<
      InputProps,
      Pick<TextInputProps, 'placeholderTextColor' | 'selectionColor'>
    >(restyleFunctions, {
      variant: inputVariant,
      ...rest,
    });

    const fontStyle = useFontStyle(containerStyle as TextStyle);
    const inputStyle = getKeys(containerStyle).reduce(
      (styleAcc, styleProperty) => {
        if (inputStyleProperties.indexOf(styleProperty) !== -1) {
          styleAcc[styleProperty] = containerStyle[styleProperty];
          delete containerStyle[styleProperty];
        }
        return styleAcc;
      },
      {} as Record<string, any>,
    );

    const handleBlur = React.useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(ev);
      },
      [],
    );

    const handleFocus = React.useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(ev);
      },
      [],
    );

    const handleChangeText = (text: string) => {
      setCurrentValue(text);
      onChangeText(text);
    };

    const handleExternalFocus = useCallback(() => {
      internalRef.current?.focus();
    }, []);

    return (
      <Pressable style={[styles.inputContainer]} onPress={handleExternalFocus}>
        <Box flexDirection="row" alignItems="center">
          <Box flex={1}>
            <Text
              as={Animated.Text}
              position="absolute"
              color="grey400"
              style={{
                top: labelAnimationRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 7],
                }),
                fontSize: labelAnimationRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 14],
                }),
              }}>
              {label ?? placeholder}
              {isRequired && <Text color="error500">*</Text>}
            </Text>
            <MaskInput
              ref={refs}
              value={value || currentValue}
              onChangeText={text => handleChangeText(text)}
              onBlur={handleBlur}
              onFocus={handleFocus}
              {...props}
              style={[
                styles.text,
                fontStyle,
                inputStyle,
                {
                  paddingTop: value ? 17 : 0,
                  fontWeight: value ? '700' : '500',
                  paddingHorizontal: 0,
                },
              ]}
              {...rest}
            />
          </Box>
        </Box>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 60,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 8,
  },
  inputLabel: {
    marginTop: 8,
  },
});

export default MaskInputComponent;
