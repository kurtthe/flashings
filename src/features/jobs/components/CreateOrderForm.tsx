import React from 'react';
import { Box, Button, OptionsType } from '@ui/components';
import { useFormikContext } from 'formik';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { formKeys, forms } from '@features/jobs/constants';
import { FieldInput, FieldSelect } from '@components/forms';
import { useGetStores } from '@hooks/jobs';
import { storesToOption } from '@features/jobs/utils';
import FieldInputDateTime from '@components/forms/FieldInputDateTime';

const optionsDeliveryOrPickUp: OptionsType[] = [
  {
    value: 'delivery',
    label: 'Delivery',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
  {
    value: 'pickUp',
    label: 'Pick up',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
];

const CreateOrderForm = () => {
  const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([]);
  const { data: stores, refetch } = useGetStores();

  const { isValid, handleSubmit, values } =
    useFormikContext<CreateOrderFormValues>();

  React.useEffect(() => {
    if (!stores) {
      refetch().catch(error => console.log('error::', error));
      return;
    }

    const storesAsRadioButton = storesToOption(stores);
    setOptionsStore(storesAsRadioButton);
  }, [stores]);

  if (!optionsStore.length) return null;

  return (
    <>
      <Box>
        <FieldSelect
          isRequired
          name={formKeys.createOrder.store}
          options={optionsStore}
          label={forms.createOrder.labels[formKeys.createOrder.store]}
        />

        <FieldInputDateTime
          isRequired
          name={formKeys.createOrder.date}
          typeFormat="date"
          placeholder={
            forms.createOrder.placeholders[formKeys.createOrder.date]
          }
          label={forms.createOrder.labels[formKeys.createOrder.date]}
          returnKeyType="next"
        />

        <FieldSelect
          isRequired
          name={formKeys.createOrder.deliveryOrPickUp}
          options={optionsDeliveryOrPickUp}
          label={
            forms.createOrder.labels[formKeys.createOrder.deliveryOrPickUp]
          }
        />

        {values[formKeys.createOrder.deliveryOrPickUp] === 'pickUp' ? (
          <FieldInputDateTime
            isRequired
            typeFormat="time"
            name={formKeys.createOrder.time}
            placeholder={
              forms.createOrder.placeholders[formKeys.createOrder.time]
            }
            label={forms.createOrder.labels[formKeys.createOrder.time]}
            returnKeyType="next"
          />
        ) : (
          <FieldInput
            isRequired
            name={formKeys.createOrder.address}
            placeholder={
              forms.createOrder.placeholders[formKeys.createOrder.address]
            }
            label={forms.createOrder.labels[formKeys.createOrder.address]}
            returnKeyType="next"
            my="m"
          />
        )}

        <FieldInput
          name={formKeys.createOrder.comments}
          placeholder={
            forms.createOrder.placeholders[formKeys.createOrder.comments]
          }
          label={forms.createOrder.labels[formKeys.createOrder.comments]}
          returnKeyType="next"
          multiline
        />
      </Box>
      <Button
        my="m"
        variant="solid"
        isDisabled={!isValid}
        onPress={handleSubmit.bind(null, undefined)}>
        Send to store
      </Button>
    </>
  );
};

export default CreateOrderForm;
