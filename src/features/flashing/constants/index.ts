import * as Yup from 'yup';


export const forms = {
  createFlashing: {
    initialValues: {
      name: '',
      material: NaN,
      flashingLengths: [
        {
          qty: NaN,
          length: NaN
        }
      ]
    },
    schema: Yup.object({
      name: Yup.string(),
      material: Yup.number().required('The material is required'),
      flashingLengths: Yup.array().of(
        Yup.object().shape({
          qty: Yup.number().required('Qty is required').typeError('Qty must be a number'),
          length: Yup.number().required('Length is required').typeError('Length must be a number')
        })
      )
    }),
  }
};


export type AddFlashingFormValues = Yup.InferType<typeof forms.createFlashing.schema> & {
  submit?: string;
};
