import React, { useCallback, useRef } from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { useCombinedRefs } from '@hooks/useCombinedRefs';
import { Box } from '@ui/components';
import Text from '@ui/components/Text';

type Props = MaskInputProps & {
  onChangeText: (text: string) => void;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
};

const MaskInputComponent = React.forwardRef<typeof TextInput, Props>(
  (
    {
      label,
      value,
      onChangeText,
      onBlur,
      onFocus,
      placeholder,
      isRequired,
      ...restProps
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string>();
    const internalRef = React.createRef<TextInput>();
    const labelAnimationRef = useRef(
      new Animated.Value(!!value ? 1 : 0),
    ).current;
    const refs = useCombinedRefs(internalRef, ref);

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
      //@ts-ignore ignore bad type related to input mask
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
              style={[
                styles.text,
                {
                  paddingTop: value ? 17 : 0,
                  fontWeight: value ? '700' : '500',
                  paddingHorizontal: 0,
                },
              ]}
              {...restProps}
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
