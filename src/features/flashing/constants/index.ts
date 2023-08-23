import * as Yup from 'yup';


export const forms = {
  createFlashing: {
    initialValues: {
      name: '',
      material: '',
      qty: 0,
      length: 0
    },
    schema: {
      name: Yup.string(),
      material: Yup.string(),
      qty: Yup.number(),
      length: Yup.number()
    }
  }
};

export type AddFlashingFormValues = Yup.InferType<typeof forms.createFlashing.schema>;
