import React from 'react';
import {KeyboardAvoidingBox} from '@ui/components';
import {Routes as RoutesFlashing, Routes} from '../navigation/routes';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  FlashingParamsList,
  FlashingStackProps,
} from '@features/flashing/navigation/Stack.types';
import {AddFlashingFormValues, forms} from '@features/flashing/constants';
import {FormCreateFlashingComponent} from '@features/flashing/components';
import {Formik, FormikProps} from 'formik';
import {getRandomInt} from '@shared/utils';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {getDataFlashing} from '@store/jobs/selectors';
import {actions as flashingActions} from '@store/flashings/actions';
import {isIOS} from '@shared/platform';

const CreateFlashingContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<FlashingStackProps>();
  const route =
    useRoute<
      RouteProp<FlashingParamsList, RoutesFlashing.CREATE_EDIT_FLASHING>
    >();
  const formikRef = React.useRef<FormikProps<AddFlashingFormValues>>(null);
  const dataFlashing = useAppSelector(state =>
    getDataFlashing(state, {
      idJob: route.params.jobId,
      idFlashing: route.params.idFlashing,
    }),
  );

  const handleSubmit = React.useCallback(
    async (values: AddFlashingFormValues) => {
      const {name, material, flashingLengths} = values;
      if (!flashingLengths) return;
      dispatch(
        flashingActions.addFlashingDraft({
          dataFlashing: {
            id: dataFlashing ? dataFlashing.id : getRandomInt(1, 500),
            name,
            flashingLengths,
            colourMaterial: material,
            dataLines: dataFlashing ? dataFlashing.dataLines : [],
            parallelRight: dataFlashing ? dataFlashing.parallelRight : true,
            angles: dataFlashing ? dataFlashing.angles : [],
            endType: dataFlashing ? dataFlashing.endType : 'none',
            startType: dataFlashing ? dataFlashing.startType : 'none',
            imgPreview: undefined,
            tapered:
              dataFlashing && dataFlashing.tapered
                ? dataFlashing.tapered
                : undefined,
          },
          jobId: route.params.jobId,
          isEdit: !!dataFlashing,
        }),
      );
      navigation.navigate(Routes.BOARD_FLASHING, {jobId: route.params.jobId});
    },
    [],
  );

  const loadInitialData = () => {
    if (!dataFlashing) {
      return {
        ...forms.createFlashing.initialValues,
        material:
          route.params.commonMaterial ??
          forms.createFlashing.initialValues.material,
      };
    }

    return {
      name: dataFlashing.name ?? '',
      material: dataFlashing.colourMaterial,
      flashingLengths: dataFlashing.flashingLengths,
    };
  };

  return (
    <DismissKeyboardPressable>
      <Formik
        innerRef={formikRef}
        initialValues={{...loadInitialData()}}
        validationSchema={forms.createFlashing.schema}
        onSubmit={handleSubmit}>
        <FormCreateFlashingComponent
          dataFlashing={dataFlashing}
          idJob={route.params.jobId}
          showButtonUpdate={!!route.params.idFlashing}
          labelButton={
            route.params.idFlashing ? 'Edit Drawing' : 'Start Drawing'
          }
        />
      </Formik>
    </DismissKeyboardPressable>
  );
};
export default CreateFlashingContainer;
