import React from 'react';
import { Box, KeyboardAvoidingBox } from "@ui/components";
import { Routes as RoutesFlashing, Routes } from "../navigation/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashingParamsList, FlashingStackProps } from "@features/flashing/navigation/Stack.types";
import {AddFlashingFormValues, forms} from "@features/flashing/constants";
import {FormCreateFlashingComponent} from "@features/flashing/components";
import { Formik,  FormikProps } from "formik";
import { getRandomInt } from "@shared/utils";
import DismissKeyboardPressable from "@components/forms/DismissKeyboardPressable";


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
          qty: qty,
          length: length,
          colourMaterial: material,
          dataLines: [],
          parallelRight: true
        }, jobId: route.params.jobId, jobName: route.params.jobName})
    },
    [],
  );

  return (
    <KeyboardAvoidingBox flex={1}>
      <DismissKeyboardPressable>
        <Box
          backgroundColor='white'
          flex={1}>
          <Formik
            innerRef={formikRef}
            initialValues={{
              ...forms.createFlashing.initialValues,
            }}
            validationSchema={forms.createFlashing.schema}
            initialErrors={forms.createFlashing.initialErrors}
            onSubmit={handleSubmit}>
            <FormCreateFlashingComponent />
          </Formik>
        </Box>
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>

  );
};
export default CreateFlashingScreen;
