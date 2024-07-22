import React from 'react';
import { FieldConfig, useField } from 'formik';
import { RadioBottom } from '@components/RadioBottom';
import { Option } from '@components/RadioBottom/RadioBottom';

type Props = Pick<FieldConfig, 'name' | 'value'> & {
  options: Option[];
};

const FieldRadioBottom: React.FC<Props> = ({ name, options }) => {
  const [field, meta, helpers] = useField(name);

  const handleOnChange = (newValues: string) => {
    helpers.setValue(newValues);
    console.log('===> handleOnChange', newValues);
  };

  return <RadioBottom onChange={handleOnChange} options={options} />;
};

export default FieldRadioBottom;
