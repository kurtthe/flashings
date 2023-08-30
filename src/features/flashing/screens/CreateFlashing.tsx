import React from 'react';
import { Box } from '@ui/components';
import { Routes } from '../navigation/routes';
import { useNavigation } from "@react-navigation/native";
import { FlashingStackProps } from "@features/flashing/navigation/Stack.types";
import {AddFlashingFormValues, forms} from "@features/flashing/constants";
import {FormCreateFlashingComponent} from "@features/flashing/components";
import { Formik,  FormikProps } from "formik";


const CreateFlashingScreen = () => {
  const navigation = useNavigation<FlashingStackProps>()
    const formikRef = React.useRef<FormikProps<AddFlashingFormValues>>(null);

  const handleSubmit = React.useCallback(
    async (
      values: AddFlashingFormValues,
    ) => {
      const { name, qty, material, length } = values;
      navigation.navigate(Routes.GUTTER_FLASHING, {
        data: {
          name,
          qty: qty ?? 0,
          length: length ?? 0,
          colourMaterial: material ?? '',
          dataLines: []
      }})
    },
    [],
  );

  return (
    <Box
      backgroundColor='white'
      flex={1}>
          <Formik
              innerRef={formikRef}
              initialValues={{
                  ...forms.createFlashing.initialValues,
              }}
              validationSchema={forms.createFlashing.schema}
              onSubmit={handleSubmit}>
              <FormCreateFlashingComponent />
          </Formik>
    </Box>
  );
};
export default CreateFlashingScreen;
