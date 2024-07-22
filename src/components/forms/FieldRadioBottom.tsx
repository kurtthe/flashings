import React from 'react';
import { FieldConfig, useField } from 'formik';
import { RadioBottom } from '@components/RadioBottom';

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
  const [field, meta, helpers] = useField(name);

  const handleOnChange = (newValues: string) => {
    helpers.setValue(newValues);
    console.log('===> handleOnChange', newValues);
  };

  return <RadioBottom onChange={handleOnChange} options={options} />;
};

export default FieldRadioBottom;
