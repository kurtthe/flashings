import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateEditFormValues } from "@features/jobs/containers/types";
import { Box, Button, Divider, Text } from '@ui/components';
import { formKeys, forms, validatePhone } from "@features/jobs/constants";
import { formatPhone } from "@shared/helpers";

type Props = {
  labelButton: string
}
const CreateEditJobFormComponent: React.FC<Props> = ({labelButton}) => {
  const { isValid,  handleSubmit,  setFieldValue } = useFormikContext<CreateEditFormValues>();

  const handleEndEditing = (text: string) => {
    if (!text) return;
    const value = text;
    const numberInternational = value.includes('+')
    const isValidPhoneNumber = validatePhone(value, !numberInternational? 'NATIONAL': 'INTERNATIONAL');

    if (isValidPhoneNumber) {
      const phoneNumber = formatPhone(value);
      setFieldValue(formKeys.createEditJob.contactNumber, phoneNumber)
    }
  };

  return (
    <>
      <Box>
        <Text variant="subheadSmallBold">Job Details</Text>
        <FieldInput
          isRequired
          name={formKeys.createEditJob.jobName}
          placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.jobName]}
          label={forms.createEditJob.labels[formKeys.createEditJob.jobName]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createEditJob.jobNumber}
          placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.jobNumber]}
          label={forms.createEditJob.labels[formKeys.createEditJob.jobNumber]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createEditJob.siteAddress}
          placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.siteAddress]}
          label={forms.createEditJob.labels[formKeys.createEditJob.siteAddress]}
          returnKeyType="next"
          mt="m"
        />
      </Box>
      <Divider my="l" />
      <Text variant="subheadSmallBold">Contact Details</Text>
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactName}
        placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.contactName]}
        label={forms.createEditJob.labels[formKeys.createEditJob.contactName]}
        returnKeyType="next"
        mt="m"
      />
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactNumber}
        placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.contactNumber]}
        label={forms.createEditJob.labels[formKeys.createEditJob.contactNumber]}
        returnKeyType="next"
        keyboardType="phone-pad"
        inputMode="tel"
        textContentType="telephoneNumber"
        mt="m"
        onEndEditing={(e) => handleEndEditing(e.nativeEvent.text)}
      />
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactEmail}
        placeholder={forms.createEditJob.placeholders[formKeys.createEditJob.contactEmail]}
        label={forms.createEditJob.labels[formKeys.createEditJob.contactEmail]}
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        mt="m"
      />
      <Button mt="l" mb="xl" isDisabled={!isValid}  onPress={handleSubmit.bind(null, undefined)}>
        {labelButton}
      </Button>
    </>
  );
};

export default CreateEditJobFormComponent;
