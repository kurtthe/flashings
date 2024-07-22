import React from 'react';
import { FieldConfig, useField } from 'formik';
import { RadioBottom } from '@components/RadioBottom';
import { Text } from '@ui/components';

export type Option = {
  value: string;
  id: string;
  label: string;
};

type Props = Pick<FieldConfig, 'name' | 'value'> & {
  options: Option[];
  label: string;
  required?: boolean;
};

const FieldRadioBottom: React.FC<Props> = ({
  name,
  options,
  label,
  required,
}) => {
  //@ts-ignore
  const [_, _, helpers] = useField(name);

  const handleOnChange = (newValues: string) => {
    helpers.setValue(newValues);
    console.log('===> handleOnChange', newValues);
  };

  return (
    <>
      <Text>
        {label}
        {required && <Text color="error500">*</Text>}
      </Text>
      <RadioBottom onChange={handleOnChange} options={options} />
    </>
  );
};

export default FieldRadioBottom;
