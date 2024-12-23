import React, {useCallback} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import MaskInput, {MaskInputProps} from 'react-native-mask-input';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
import {Box, Icon, IconButton} from '@ui/components';
import Text from '@ui/components/Text';
import {RestyleInputProps} from '@ui/components/Input';
import {palette, SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme';
import {isAndroid, isTablet} from '@shared/platform';

type Props = RestyleInputProps &
  MaskInputProps & {
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    icon?: any;
    onIcon?: () => void;
  };

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
      icon,
      onIcon,
      ...rest
    },
    ref,
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string>();
    const internalRef = React.createRef<TextInput>();
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
                top: isAndroid ? 5 : 10,
                fontSize: isTablet ? 16 : 14,
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
                  paddingTop: 17,
                  fontWeight: '700',
                  paddingHorizontal: 0,
                },
              ]}
              {...rest}
            />
          </Box>
          {icon && (
            <IconButton
              icon={
                <Icon
                  as={icon}
                  size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                />
              }
              onPress={() => onIcon?.()}
            />
          )}
        </Box>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: palette.base100,
    borderWidth: 1,
    height: isTablet ? 80 : 60,
  },
  text: {
    color: 'black',
    fontSize: isTablet ? 18 : 16,
    lineHeight: 20,
    height: '100%',
  },
  inputLabel: {
    marginTop: isTablet ? 10 : 8,
  },
});

export default MaskInputComponent;
