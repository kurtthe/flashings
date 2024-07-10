import React from 'react';
import { Box, Button, OptionsType } from '@ui/components';
import { useFormikContext } from 'formik';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { formKeys, forms } from '@features/jobs/constants';
import { FieldInput, FieldSelect } from '@components/forms';
import { useGetStores } from '@hooks/jobs';
import { storesToOption } from '@features/jobs/utils';
import FieldInputDateTime from '@components/forms/FieldInputDateTime';
import { optionsDelivery } from '@features/jobs/constants/order';

const optionsDeliveryOrPickUp: OptionsType[] = [
  {
    value: optionsDelivery[0],
    label: 'Delivery',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
  {
    value: optionsDelivery[1],
    label: 'Pick up',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
];

type Props = {
  isLoading: boolean;
};
const CreateOrderForm: React.FC<Props> = ({ isLoading }) => {
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

        {values[formKeys.createOrder.deliveryOrPickUp] ===
        optionsDelivery[1] ? (
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
          multiline
        />
      </Box>
      <Button
        my="m"
        variant="solid"
        isDisabled={!isValid || isLoading}
        isLoading={isLoading}
        onPress={handleSubmit.bind(null, undefined)}>
        Send to store
      </Button>
    </>
  );
};

export default CreateOrderForm;
