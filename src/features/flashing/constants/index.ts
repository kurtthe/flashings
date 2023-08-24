import * as Yup from 'yup';


export const forms = {
  createFlashing: {
    initialValues: {
      name: '',
      material: '',
      qty: 0,
      length: 0
    },
    schema: Yup.object({
      name: Yup.string(),
      material: Yup.string(),
      qty: Yup.number().typeError('Qty must be a number'),
      length: Yup.number().typeError('Length must be a number')
    }),
  }
};


export type AddFlashingFormValues = Yup.InferType<typeof forms.createFlashing.schema> & {
  submit?: string;
};