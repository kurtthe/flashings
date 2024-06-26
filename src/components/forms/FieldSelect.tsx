import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FieldConfig, useField } from 'formik';

import { Box,  SelectInput, SelectInputProps, OptionsType, Text } from '@ui/components';
import ErrorMessage from './ErrorMessage';

import type { ComponentWithAs } from '@ui/types';

type Props = Omit<SelectInputProps, 'onChange'> &
  Pick<FieldConfig, 'name' | 'type' | 'validate' | 'value'> & {
  name: string;
  initialValue?: string;
  label: string;
  onChange?: (item: any, prev: any) => void;
};
const isAndroid = Platform.OS === 'android';
const FieldSelect = ({ options, name, onChange, onBlur, label, isRequired, ...rest }: Props) => {
  const [field, meta, helpers] = useField<number>(name);
  const isInvalid = Boolean(meta.touched && meta.error);

  const handleChange = React.useCallback(
    (item: OptionsType) => {
      helpers.setValue(item.value);
      onChange && onChange(item.value, field.value);
    },
    [helpers, onChange],
  );

  return (
    <Box>
      <SelectInput
        value={field.value.toString()}
        options={options}
        onChange={handleChange}
        label={label}
        isRequired={isRequired}
        {...rest}
      />
      <Box style={styles.labelContainer}>
        <Text variant="subheadLight" fontSize={14}>
          {options.length !== 0 && field.value ? label : ''}
          {field.value && isRequired ? <Text color="error500">*</Text>: null}
        </Text>
      </Box>
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Box>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    left: 8,
    top: 7,
  },
  containerStyle: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
  },
  selectedTextStyle: {
    height: isAndroid ? 40 : 'auto',
    paddingTop: 17,
    fontWeight: '600',
  },
});

export default React.memo(FieldSelect) as ComponentWithAs<typeof SelectInput, Props>;
