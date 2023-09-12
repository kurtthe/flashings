import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateFormValues } from '@features/jobs/containers/types';
import { Box, Button, Divider, Text } from '@ui/components';
import { formKeys, forms, validatePhone } from "@features/jobs/constants";
import { formatPhone } from "@shared/helpers";

const CreateJobFormComponent = () => {
  const formik = useFormikContext<CreateFormValues>();
  const { isValid,  handleSubmit,  setFieldValue } = formik;

  const handleEndEditing = (text: string) => {
    if (!text) return;
    const value = text;
    const isValidPhoneNumber = validatePhone(value);

    if (isValidPhoneNumber) {
      const phoneNumber = formatPhone(value);
      setFieldValue(formKeys.createJob.contactNumber, phoneNumber)
    }
  };

  return (
    <>
      <Box>
        <Text variant="subheadSmallBold">Job Details</Text>
        <FieldInput
          isRequired
          name={formKeys.createJob.jobName}
          placeholder={forms.createJob.placeholders[formKeys.createJob.jobName]}
          label={forms.createJob.labels[formKeys.createJob.jobName]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createJob.jobNumber}
          placeholder={forms.createJob.placeholders[formKeys.createJob.jobNumber]}
          label={forms.createJob.labels[formKeys.createJob.jobNumber]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createJob.siteAddress}
          placeholder={forms.createJob.placeholders[formKeys.createJob.siteAddress]}
          label={forms.createJob.labels[formKeys.createJob.siteAddress]}
          returnKeyType="next"
          mt="m"
        />
      </Box>
      <Divider my="l" />
      <Text variant="subheadSmallBold">Contact Details</Text>
      <FieldInput
        isRequired
        name={formKeys.createJob.contactName}
        placeholder={forms.createJob.placeholders[formKeys.createJob.contactName]}
        label={forms.createJob.labels[formKeys.createJob.contactName]}
        returnKeyType="next"
        mt="m"
      />
      <FieldInput
        isRequired
        name={formKeys.createJob.contactNumber}
        placeholder={forms.createJob.placeholders[formKeys.createJob.contactNumber]}
        label={forms.createJob.labels[formKeys.createJob.contactNumber]}
        returnKeyType="next"
        keyboardType="phone-pad"
        inputMode="tel"
        textContentType="telephoneNumber"
        mt="m"
        onEndEditing={(e) => handleEndEditing(e.nativeEvent.text)}
      />
      <FieldInput
        isRequired
        name={formKeys.createJob.contactEmail}
        placeholder={forms.createJob.placeholders[formKeys.createJob.contactEmail]}
        label={forms.createJob.labels[formKeys.createJob.contactEmail]}
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        mt="m"
      />
      <Button mt="l" mb="xl" isDisabled={!isValid}  onPress={handleSubmit.bind(null, undefined)}>
        Create Job
      </Button>
    </>
  );
};

export default CreateJobFormComponent;
