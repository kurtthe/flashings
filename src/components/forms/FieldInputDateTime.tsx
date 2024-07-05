import React from 'react';
import { FieldConfig, useField } from 'formik';
import { Box } from '@ui/components';
import InputDate from '@components/InputDate';
import InputTime from '@components/InputTime';

export type Props = Pick<FieldConfig<any>, 'name' | 'value'> & {
  label: string;
  isRequired?: boolean;
  typeFormat?: 'date' | 'time' | 'datetime';
  defaultValue?: string;
  onChangeText?: (newText: string) => void;
};

const FieldInputDateTime: React.FC<Props> = ({
  label,
  name,
  value,
  typeFormat,
  defaultValue,
  onChangeText,
  isRequired = false,
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
        onChange={handleChangeText}
      />
    );
  }

  if (typeFormat === 'time') {
    return (
      <InputTime
        label={label}
        isRequired={isRequired}
        onChange={handleChangeText}
      />
    );
  }

  return <Box></Box>;
};

export default FieldInputDateTime;
