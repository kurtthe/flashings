import React from 'react';
import { FieldConfig } from 'formik';

export type Props = Pick<FieldConfig<any>, 'name' | 'value'> & {
  isRequired?: boolean;
  typeFormat?: 'date' | 'time' | 'datetime';
  defaultValue?: string;
};

const FieldInputDate = () => {};
