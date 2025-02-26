import React from 'react';
import {FieldInput, FieldSelect} from '@components/forms';
import {Button, Box, IconButton, Icon, Text} from '@ui/components';
import {FieldArray, useFormikContext} from 'formik';
import {AddFlashingFormValues} from '@features/flashing/constants';
import {TrashIcon} from '@assets/icons';
import {actions as flashingActions} from '@store/jobs/actions';
import {useAppDispatch} from '@hooks/useStore';
import {FLASHINGS_DATA} from '@models';
import {useNavigation} from '@react-navigation/native';
import {FlashingStackProps} from '@features/flashing/navigation/Stack.types';
import {dataMaterials} from '@store/jobs/mocks';
import {Alert} from 'react-native';
import {isTablet} from '@shared/platform';
import {SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme';
import {config} from '@env/config';

type Props = {
  labelButton: string;
  idJob?: number;
  dataFlashing?: FLASHINGS_DATA;
  showButtonUpdate?: boolean;
};
const FormCreateFlashingComponent: React.FC<Props> = ({
  labelButton,
  idJob,
  dataFlashing,
  showButtonUpdate = false,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<FlashingStackProps>();
  const formik = useFormikContext<AddFlashingFormValues>();
  const {values, handleSubmit, isValid, isSubmitting} = formik;

  const alertDelete = () =>
    Alert.alert('Are you sure delete this Flashing?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          handleUpdateDeleteFlashing(true);
        },
      },
    ]);

  const handleUpdateDeleteFlashing = (deleteFlashing = false) => {
    if (!idJob || !dataFlashing) return;

    if (deleteFlashing) {
      dispatch(
        flashingActions.deleteFlashing({idJob, idFlashing: dataFlashing.id}),
      );
      return navigation.goBack();
    }

    const newDataFlashing = {
      ...dataFlashing,
      name: values.name,
      colourMaterial: values.material,
      flashingLengths: values.flashingLengths ?? [],
    };
    dispatch(
      flashingActions.addEditFlashing({idJob, flashing: newDataFlashing}),
    );
    navigation.goBack();
  };

  return (
    <Box px="m" flex={1}>
      <Box my="m" flex={1}>
        <FieldInput name="name" returnKeyType="next" label="Name" my="l" />
        <FieldSelect
          isRequired
          label="Colour/Material"
          name="material"
          options={dataMaterials.map(material => ({
            value: material.id.toString(),
            label: material.label,
            bgColor: material.bgColor,
            textColor: material.textColor,
            bold: material.bold,
            disabled: material.disabled,
          }))}
        />
        <FieldArray
          name="flashingLengths"
          render={arrayHelpers => (
            <>
              {values.flashingLengths?.map((_, index, arrayLengths) => (
                <React.Fragment key={`row-length-${index}`}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    mt="l"
                    justifyContent="space-between"
                    mb="unset">
                    {arrayLengths.length > 1 && (
                      <Text
                        variant="lightGraySmallText"
                        fontWeight="bold"
                        color="black">
                        {index + 1}
                      </Text>
                    )}
                    <FieldInput
                      name={`flashingLengths.${index}.qty`}
                      label="Qty"
                      style={{
                        width:
                          arrayLengths.length > 1
                            ? isTablet
                              ? 300
                              : 150
                            : isTablet
                              ? 340
                              : 170,
                      }}
                      keyboardType="number-pad"
                    />
                    <FieldInput
                      name={`flashingLengths.${index}.length`}
                      label="Length"
                      style={{
                        width:
                          arrayLengths.length > 1
                            ? isTablet
                              ? 300
                              : 150
                            : isTablet
                              ? 340
                              : 170,
                      }}
                      suffix={config.unitMeasurement}
                      returnKeyType="next"
                      keyboardType="number-pad"
                    />
                    {arrayLengths.length > 1 && (
                      <IconButton
                        mt="unset"
                        icon={
                          <Icon
                            as={TrashIcon}
                            size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                            color="errorAlert"
                          />
                        }
                        onPress={() => arrayHelpers.remove(index)}
                      />
                    )}
                  </Box>
                </React.Fragment>
              ))}
              <Box mt="xl">
                <Button
                  my="s"
                  isDisabled={values.flashingLengths?.length === 8}
                  variant="outlineWhite"
                  onPress={() =>
                    arrayHelpers.push({
                      qty: NaN,
                      length: NaN,
                    })
                  }>
                  + Add Length
                </Button>
                <Button
                  isDisabled={!isValid || !values.material}
                  onPress={handleSubmit.bind(null, undefined)}
                  isLoading={isSubmitting}>
                  {labelButton}
                </Button>

                {showButtonUpdate && (
                  <>
                    <Button
                      mt="s"
                      isDisabled={!isValid || !values.material}
                      isLoading={isSubmitting}
                      onPress={() => handleUpdateDeleteFlashing()}>
                      Update Flashing
                    </Button>
                    <Button
                      variant="delete"
                      mt="s"
                      isLoading={isSubmitting}
                      onPress={() => alertDelete()}>
                      Delete Flashing
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        />
      </Box>
    </Box>
  );
};

export default FormCreateFlashingComponent;
