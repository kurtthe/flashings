import React, { forwardRef, memo, useCallback } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';
import { useAppRestyle } from '@theme';
import { FieldConfig, useField } from 'formik';
import { Box, Input } from '@ui/components';

import { restyleFunctionsField } from './constants';
import ErrorMessage from './ErrorMessage';

import type { InputProps } from '@ui/components';
import type { ComponentWithAs } from '@ui/types';
import { isNaN } from 'lodash';

export type Props = InputProps & { suffix?: string } & Pick<
    FieldConfig<any>,
    'name' | 'type' | 'value'
  > & {
    label?: string;
    styleInput?: StyleProp<TextStyle>;
    isClearButtonModeIcon?:
      | 'while-editing'
      | 'never'
      | 'unless-editing'
      | 'always';
    styleContent?: StyleProp<TextStyle>;
  };

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
      isClearButtonModeIcon,
      ...rest
    },
    ref,
  ) => {
    const [field, meta] = useField({ name, value, defaultValue });
    const { style: containerStyle = {}, ...passedProps } = useAppRestyle(
      restyleFunctionsField,
      rest,
    );
    const isInvalid = Boolean(meta.error);

    const handleBlur = useCallback(
      (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(ev);
        field.onBlur(name)(ev);
      },
      [],
    );

    const handleChangeText = useCallback((text: string) => {
      onChangeText?.(text);
      field.onChange(name)(text);
    }, []);

    return (
      <Box style={[containerStyle]}>
        <Input
          style={styleInput}
          ref={ref}
          name={name}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          defaultValue={
            isNaN(meta.initialValue) ? '' : meta.initialValue?.toString()
          }
          value={isNaN(field.value) ? '' : field.value?.toString()}
          isInvalid={isInvalid}
          clearButtonMode={isClearButtonModeIcon ?? 'while-editing'}
          styleContent={styleContent}
          {...passedProps}
        />
        {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
      </Box>
    );
  },
);

export default memo(FieldInput) as ComponentWithAs<typeof Input, Props>;
