import React from 'react';
import { Box, Button, OptionsType } from '@ui/components';
import { FieldArray, useFormikContext } from 'formik';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { formKeys, forms } from '@features/jobs/constants';
import { FieldInput, FieldSelect } from '@components/forms';
import { useGetOrderValidations, useGetStores } from '@hooks/jobs';
import { storesToOption } from '@features/jobs/utils';
import FieldInputDateTime from '@components/forms/FieldInputDateTime';
import { optionsDelivery } from '@features/jobs/constants/order';
import FieldRadioBottom from '@components/forms/FieldRadioBottom';

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
  const { data: dataFieldsOrderValidations } = useGetOrderValidations();

  const { isValid, handleSubmit, values, setFieldValue } =
    useFormikContext<CreateOrderFormValues>();

  React.useEffect(() => {
    if (!stores) {
      refetch().catch(error => console.log('error::', error));
      return;
    }

    const storesAsRadioButton = storesToOption(stores);
    setOptionsStore(storesAsRadioButton);
  }, [stores]);

  React.useEffect(() => {
    if (!dataFieldsOrderValidations || !dataFieldsOrderValidations.length)
      return;
    setFieldValue(
      formKeys.createOrder.burdens_data,
      dataFieldsOrderValidations.map(item => ({
        index: item.index,
        value: item.default,
      })),
    ).catch(err => console.log('error::', err));
  }, [dataFieldsOrderValidations]);

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
          label={forms.createOrder.labels[formKeys.createOrder.date]}
        />

        <FieldSelect
          isRequired
          name={formKeys.createOrder.deliveryOrPickUp}
          options={optionsDeliveryOrPickUp}
          label={
            forms.createOrder.labels[formKeys.createOrder.deliveryOrPickUp]
          }
        />

        <FieldRadioBottom
          name={formKeys.createOrder.quote_only}
          options={[
            {
              id: 'quote_only',
              label: 'Quote Only',
              value: 'quote_only',
            },
          ]}
        />

        {values[formKeys.createOrder.deliveryOrPickUp] ===
        optionsDelivery[1] ? (
          <FieldInputDateTime
            isRequired
            typeFormat="time"
            name={formKeys.createOrder.time}
            label={forms.createOrder.labels[formKeys.createOrder.time]}
            returnKeyType="next"
          />
        ) : (
          <FieldInput
            isRequired
            name={formKeys.createOrder.address}
            label={forms.createOrder.labels[formKeys.createOrder.address]}
            returnKeyType="next"
            my="s"
          />
        )}
        {dataFieldsOrderValidations && (
          <FieldArray
            name={formKeys.createOrder.burdens_data}
            render={() => (
              <>
                {/*@ts-ignore*/}
                {values[formKeys.createOrder.burdens_data].map((_, index) => (
                  <FieldInput
                    isRequired
                    name={`${formKeys.createOrder.burdens_data}.${index}.value`}
                    label={dataFieldsOrderValidations[index].prompt}
                    placeholder={dataFieldsOrderValidations[index].mask}
                    my="s"
                  />
                ))}
              </>
            )}
          />
        )}

        <FieldInput
          name={formKeys.createOrder.comments}
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
