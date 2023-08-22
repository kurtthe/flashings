import * as Yup from 'yup';
import { forms } from '../constants';

export type CreateFormValues = Yup.InferType<typeof forms.createJob.schema> & {
  submit?: string;
};
