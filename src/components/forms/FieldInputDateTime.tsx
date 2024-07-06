import React from 'react';
import { FieldConfig, useField } from 'formik';
import { Box, type InputProps } from '@ui/components';
import InputDate from '@components/InputDate';
import InputTime from '@components/InputTime';

export type Props = InputProps &
  Pick<FieldConfig<any>, 'name' | 'value'> & {
    label: string;
    typeFormat?: 'date' | 'time' | 'datetime';
  };

const FieldInputDateTime: React.FC<Props> = ({
  label,
  name,
  value,
  typeFormat,
  defaultValue,
  onChangeText,
  isRequired = false,
  ...rest
}) => {
  const [field, meta] = useField({ name, value, defaultValue });

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
    field.onChange(name)(text);
  };

  if (typeFormat === 'date') {
    return (
      <InputDate
        label={label}
        isRequired={isRequired}
        onChangeText={handleChangeText}
        {...rest}
      />
    );
  }

  if (typeFormat === 'time') {
    return (
      <InputTime
        label={label}
        isRequired={isRequired}
        onChangeText={handleChangeText}
        {...rest}
      />
    );
  }

  return <Box></Box>;
};

export default FieldInputDateTime;
