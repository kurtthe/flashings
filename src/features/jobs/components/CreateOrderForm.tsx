import React from 'react';
import { Box, Button, OptionsType } from '@ui/components';
import { useFormikContext } from 'formik';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { formKeys, forms } from '@features/jobs/constants';
import { FieldInput, FieldSelect } from '@components/forms';
import { useGetStores } from '@hooks/jobs';
import { storesToOption } from '@features/jobs/utils';

const CreateOrderForm = () => {
  const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([]);
  const { data: stores, refetch } = useGetStores();

  const { isValid, handleSubmit, setFieldValue } =
    useFormikContext<CreateOrderFormValues>();

  React.useEffect(() => {
    if (!stores) {
      refetch().catch(error => console.log('error::', error));
      return;
    }

    const storesAsRadioButton = storesToOption(stores);
    setOptionsStore(storesAsRadioButton);
  }, [stores]);

  console.log('==>[optionsStore]', JSON.stringify(optionsStore));

  return (
    <>
      <Box>
        <FieldSelect
          name={formKeys.createOrder.store}
          options={optionsStore}
          label={forms.createOrder.labels[formKeys.createOrder.store]}
        />
        <FieldInput
          name={formKeys.createOrder.comments}
          placeholder={
            forms.createOrder.placeholders[formKeys.createOrder.comments]
          }
          label={forms.createOrder.labels[formKeys.createOrder.comments]}
          returnKeyType="next"
          mt="m"
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
