import * as Yup from 'yup';
import { forms } from '../constants';

export type LoginFormValues = Yup.InferType<typeof forms.login.schema> & {
  submit?: string;
};
