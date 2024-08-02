import React from 'react';
import { FieldInput, FieldSelect } from '@components/forms';
import { Button, Box, ScrollBox, IconButton, Icon, Text } from '@ui/components';
import { FieldArray, useFormikContext } from 'formik';
import { AddFlashingFormValues } from '@features/flashing/constants';
import { TrashIcon } from '@assets/icons';
import { actions as flashingActions } from '@store/jobs/actions';
import { useAppDispatch } from '@hooks/useStore';
import { FLASHINGS_DATA } from '@models';
import { useNavigation } from '@react-navigation/native';
import { FlashingStackProps } from '@features/flashing/navigation/Stack.types';
import { dataMaterials } from '@store/jobs/mocks';
import { Alert } from 'react-native';
import { isTablet } from '@shared/platform';

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
  const { values, handleSubmit, isValid, isSubmitting } = formik;

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
        flashingActions.deleteFlashing({ idJob, idFlashing: dataFlashing.id }),
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
      flashingActions.addEditFlashing({ idJob, flashing: newDataFlashing }),
    );
    navigation.goBack();
  };

  console.log('==>isTablet', isTablet);

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
              <ScrollBox height="30%" showsVerticalScrollIndicator={false}>
                {values.flashingLengths?.map((_, index, arrayLengths) => (
                  <React.Fragment key={`row-length-${index}`}>
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      mt="l"
                      justifyContent="space-between"
                      mb="unset">
                      {arrayLengths.length > 1 && (
                        <Text variant="bodyFooterBold">{index + 1}</Text>
                      )}
                      <FieldInput
                        name={`flashingLengths.${index}.qty`}
                        label="Qty"
                        style={{ width: arrayLengths.length > 1 ? 150 : 170 }}
                        keyboardType="numeric"
                      />
                      <FieldInput
                        name={`flashingLengths.${index}.length`}
                        label="Length"
                        style={{ width: arrayLengths.length > 1 ? 150 : 170 }}
                        suffix="mm"
                        keyboardType="numeric"
                      />
                      {arrayLengths.length > 1 && (
                        <IconButton
                          mt="unset"
                          icon={<Icon as={TrashIcon} />}
                          onPress={() => arrayHelpers.remove(index)}
                        />
                      )}
                    </Box>
                  </React.Fragment>
                ))}
              </ScrollBox>
              <Button
                isDisabled={values.flashingLengths?.length === 8}
                variant="outlineWhite"
                mt="2xl"
                onPress={() =>
                  arrayHelpers.push({
                    qty: NaN,
                    length: NaN,
                  })
                }>
                + Add Length
              </Button>
            </>
          )}
        />
      </Box>
      <Box mb="m">
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
    </Box>
  );
};

export default FormCreateFlashingComponent;
