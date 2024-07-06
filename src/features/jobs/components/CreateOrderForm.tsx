import React from 'react';
import { Box, Button, OptionsType, SelectInput } from '@ui/components';
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

  return (
    <>
      <Box>
        <FieldSelect
          name={formKeys.createOrder.store}
          options={optionsStore}
          label={forms.createEditJob.labels[formKeys.createOrder.store]}
        />
        <FieldInput
          name={formKeys.createOrder.comments}
          placeholder={
            forms.createEditJob.placeholders[formKeys.createOrder.comments]
          }
          label={forms.createEditJob.labels[formKeys.createOrder.comments]}
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
