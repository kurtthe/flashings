import * as Yup from 'yup';


export const forms = {
  createFlashing: {
    initialErrors: {
      name: '',
      material: '',
      qty: '',
      length: '',
    },
    initialValues: {
      name: '',
      material: NaN,
      qty: NaN,
      length: NaN
    },
    schema: Yup.object({
      name: Yup.string().required('Name is required'),
      material: Yup.number().required('The material is required'),
      qty: Yup.number().required('Qty is required').typeError('Qty must be a number'),
      length: Yup.number().required('Qty is required').typeError('Length must be a number')
    }),
  }
};


export type AddFlashingFormValues = Yup.InferType<typeof forms.createFlashing.schema> & {
  submit?: string;
};
