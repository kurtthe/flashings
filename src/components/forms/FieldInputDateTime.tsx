import React from 'react';
import { FieldConfig, useField } from 'formik';
import { type InputProps } from '@ui/components';
import InputDate from '@components/InputDate';
import InputTime from '@components/InputTime';
import ErrorMessage from '@components/forms/ErrorMessage';

export type Props = InputProps &
  Pick<FieldConfig<any>, 'name' | 'value'> & {
    label: string;
    typeFormat?: 'date' | 'time';
  };

const FieldInputDateTime: React.FC<Props> = ({
  label,
  name,
  value,
  typeFormat = 'date',
  defaultValue,
  onChangeText,
  isRequired = false,
  ...rest
}) => {
  const [field, meta] = useField({ name, value, defaultValue });
  const isInvalid = Boolean(meta.error);

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
    field.onChange(name)(text);
  };

  return (
    <>
      {typeFormat === 'date' ? (
        <InputDate
          label={label}
          isRequired={isRequired}
          onChangeText={handleChangeText}
          {...rest}
        />
      ) : (
        <InputTime
          label={label}
          isRequired={isRequired}
          onChangeText={handleChangeText}
          {...rest}
        />
      )}
      {isInvalid && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

export default FieldInputDateTime;
