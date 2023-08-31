import React from 'react';
import { Box } from '@ui/components';
import { Routes as RoutesFlashing, Routes } from "../navigation/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashingParamsList, FlashingStackProps } from "@features/flashing/navigation/Stack.types";
import {AddFlashingFormValues, forms} from "@features/flashing/constants";
import {FormCreateFlashingComponent} from "@features/flashing/components";
import { Formik,  FormikProps } from "formik";
import { getRandomInt } from "@shared/utils";


const CreateFlashingScreen = () => {
  const navigation = useNavigation<FlashingStackProps>()
  const route = useRoute<RouteProp<FlashingParamsList, RoutesFlashing.CREATE_EDIT_FLASHING>>();

  const formikRef = React.useRef<FormikProps<AddFlashingFormValues>>(null);

  const handleSubmit = React.useCallback(
    async (
      values: AddFlashingFormValues,
    ) => {
      const { name, qty, material, length } = values;
      navigation.navigate(Routes.BOARD_FLASHING, {
        data: {
          id: getRandomInt(),
          name,
          qty: qty ?? 0,
          length: length ?? 0,
          colourMaterial: material ?? 1,
          dataLines: [],
          parallelRight: true
        }, jobId: route.params.jobId, jobName: route.params.jobName})
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
