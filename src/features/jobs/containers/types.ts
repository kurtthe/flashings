import * as Yup from 'yup';
import { forms } from '@features/jobs/constants';

export type CreateEditFormValues = Yup.InferType<
  typeof forms.createEditJob.schema
> & {
  submit?: string;
};
