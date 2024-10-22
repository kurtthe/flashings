import React from 'react';
import {Box, Button, OptionsType} from '@ui/components';
import {FieldArray, useFormikContext} from 'formik';
import {formKeys, forms} from '@features/orders/constants';
import {FieldInput, FieldSelect} from '@components/forms';
import {useGetOrderValidations, useGetStores} from '@hooks/jobs';
import {storesToOption} from '@features/jobs/utils';
import FieldInputDateTime from '@components/forms/FieldInputDateTime';
import {optionsDelivery} from '@features/orders/constants/order';
import FieldCheckbox from '@components/forms/FieldCheckbox';
import {optionsDeliveryOrPickUp} from '@features/orders/type';
import {CreateOrderFormValues} from '@models/order';

type Props = {
  isLoading: boolean;
};

const CreateOrderForm: React.FC<Props> = ({isLoading}) => {
  const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([]);
  const {data: stores, refetch} = useGetStores();
  const {data: dataFieldsOrderValidations} = useGetOrderValidations();

  const {isValid, handleSubmit, values, setFieldValue} =
    useFormikContext<CreateOrderFormValues>();

  const showAddressDelivery = React.useMemo(() => {
    return values[formKeys.createOrder.deliveryOrPickUp] !== optionsDelivery[1];
  }, [values[formKeys.createOrder.deliveryOrPickUp]]);

  React.useEffect(() => {
    if (!stores) {
      refetch().catch(error => console.error('Error fetching stores:', error));
      return;
    }
    setOptionsStore(storesToOption(stores));
  }, [stores, refetch]);

  React.useEffect(() => {
    if (!dataFieldsOrderValidations || !dataFieldsOrderValidations.length)
      return;

    setFieldValue(
      formKeys.createOrder.burdens_data,
      dataFieldsOrderValidations.map(item => ({
        index: item.index,
        value: item.default ?? '',
      })),
    ).catch(err => console.error('Error setting burdens data:', err));
  }, [dataFieldsOrderValidations, setFieldValue]);

  if (!optionsStore.length) return null;

  return (
    <Box p="m">
      <OrderFormFields
        optionsStore={optionsStore}
        showAddressDelivery={showAddressDelivery}
        dataFieldsOrderValidations={dataFieldsOrderValidations}
        values={values}
      />
      <Button
        my="m"
        variant="solid"
        isDisabled={!isValid || isLoading}
        isLoading={isLoading}
        onPress={handleSubmit.bind(null, undefined)}>
        Preview
      </Button>
    </Box>
  );
};

const OrderFormFields: React.FC<any> = ({
  optionsStore,
  showAddressDelivery,
  dataFieldsOrderValidations,
  values,
}) => (
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
      label={forms.createOrder.labels[formKeys.createOrder.deliveryOrPickUp]}
    />
    <FieldCheckbox
      name={formKeys.createOrder.quote_only}
      title={forms.createOrder.labels[formKeys.createOrder.quote_only]}
      options={[{label: '1', checked: true}]}
    />
    {showAddressDelivery && (
      <FieldInput
        isRequired
        name={formKeys.createOrder.address}
        label={forms.createOrder.labels[formKeys.createOrder.address]}
        my="s"
      />
    )}
    {dataFieldsOrderValidations && (
      <FieldArray
        name={formKeys.createOrder.burdens_data}
        render={() =>
          values[formKeys.createOrder.burdens_data].map((_, index) => (
            <FieldInput
              key={`input-burdens-data${index}`}
              name={`${formKeys.createOrder.burdens_data}.${index}.value`}
              label={dataFieldsOrderValidations[index].prompt}
              placeholder={dataFieldsOrderValidations[index].mask}
              my="s"
              isRequired
            />
          ))
        }
      />
    )}
    <FieldInput
      name={formKeys.createOrder.comments}
      label={forms.createOrder.labels[formKeys.createOrder.comments]}
      multiline
    />
  </Box>
);

export default CreateOrderForm;
