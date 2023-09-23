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
import { useAppSelector } from "@hooks/useStore";
import { getDataFlashing } from "@store/jobs/selectors";


const CreateFlashingScreen = () => {
  const navigation = useNavigation<FlashingStackProps>()
  const route = useRoute<RouteProp<FlashingParamsList, RoutesFlashing.CREATE_EDIT_FLASHING>>();
  const formikRef = React.useRef<FormikProps<AddFlashingFormValues>>(null);
  const dataFlashing = useAppSelector((state) => getDataFlashing(state, { idJob: route.params.jobId, idFlashing: route.params.idFlashing }));


  const handleSubmit = React.useCallback(
    async (
      values: AddFlashingFormValues,
    ) => {

      const { name,  material, flashingLengths } = values;
      if(!flashingLengths) return

      navigation.navigate(Routes.BOARD_FLASHING, {
        data: {
          id: getRandomInt(),
          name,
          flashingLengths,
          colourMaterial: material,
          dataLines: dataFlashing? dataFlashing.dataLines:  [],
          parallelRight: dataFlashing? dataFlashing.parallelRight : true
        },
        jobId: route.params.jobId})
    },
    [],
  );

  const loadInitialData = ()=> {
    if(!dataFlashing){
      return forms.createFlashing.initialValues
    }
    return {
      name: dataFlashing.name ?? '',
      material: dataFlashing.colourMaterial,
      flashingLengths: dataFlashing.flashingLengths
    }
  }

  return (
    <KeyboardAvoidingBox flex={1}>
      <DismissKeyboardPressable>
        <Box
          backgroundColor='white'
          flex={1}>
          <Formik
            innerRef={formikRef}
            initialValues={{
              ...loadInitialData(),
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
