import {config} from '@env/config';
import * as Yup from 'yup';

export const forms = {
  createFlashing: {
    initialValues: {
      name: '',
      material: NaN,
      flashingLengths: [
        {
          qty: NaN,
          length: NaN,
        },
      ],
    },
    schema: Yup.object({
      name: Yup.string(),
      material: Yup.number().required('The material is required'),
      flashingLengths: Yup.array().of(
        Yup.object().shape({
          qty: Yup.number()
            .min(1, `must be at least 1`)
            .required('Qty is required')
            .integer('must be a whole number')
            .typeError('Qty must be a number'),
          length: Yup.number()
            .required('Length is required')
            .integer('Length must not contain decimals')
            .typeError('Length must be a number')
            .min(
              10,
              `The length must be at least ${config.minimumSizeLinesMM} mm.`,
            ),
        }),
      ),
    }),
  },
};

export type AddFlashingFormValues = Yup.InferType<
  typeof forms.createFlashing.schema
> & {
  submit?: string;
};
