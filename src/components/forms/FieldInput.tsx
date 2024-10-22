import React, {forwardRef, memo, useCallback} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';
import {useAppRestyle} from '@theme';
import {FieldConfig, useField} from 'formik';
import {Box, Input} from '@ui/components';
import {restyleFunctionsField} from './constants';
import ErrorMessage from './ErrorMessage';
import type {InputProps} from '@ui/components';
import type {ComponentWithAs} from '@ui/types';
import {isNaN} from 'lodash';

export type Props = InputProps & {
  suffix?: string;
  label?: string;
  styleInput?: StyleProp<TextStyle>;
  isClearButtonModeIcon?:
    | 'while-editing'
    | 'never'
    | 'unless-editing'
    | 'always';
  styleContent?: StyleProp<TextStyle>;
} & Pick<FieldConfig<any>, 'name' | 'type' | 'value'>;

const FieldInput = forwardRef<typeof Input, Props>(
  (
    {
      name,
      value,
      defaultValue,
      onBlur,
      onChangeText,
      styleInput,
      styleContent,
      isClearButtonModeIcon = 'while-editing',
      ...rest
    },
    ref,
  ) => {
    const [field, {error, initialValue, touched}] = useField({
      name,
      value,
      defaultValue,
    });
    const {style: containerStyle = {}, ...passedProps} = useAppRestyle(
      restyleFunctionsField,
      rest,
    );
    const isInvalid = Boolean(error && touched);

    const handleBlur = useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(ev);
        field.onBlur(name)(ev);
      },
      [onBlur, field, name],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        onChangeText?.(text);
        field.onChange(name)(text);
      },
      [onChangeText, field, name],
    );

    return (
      <Box style={[containerStyle]}>
        <Input
          variant={rest.multiline ? 'area' : undefined}
          ref={ref}
          style={styleInput}
          name={name}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          defaultValue={isNaN(initialValue) ? '' : initialValue?.toString()}
          value={isNaN(field.value) ? '' : field.value?.toString()}
          isInvalid={isInvalid}
          clearButtonMode={isClearButtonModeIcon}
          styleContent={styleContent}
          {...passedProps}
        />
        {isInvalid && <ErrorMessage>{error}</ErrorMessage>}
      </Box>
    );
  },
);

export default memo(FieldInput) as ComponentWithAs<typeof Input, Props>;
