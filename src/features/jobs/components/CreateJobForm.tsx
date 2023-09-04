import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateFormValues } from '@features/jobs/containers/types';
import { Box, Button, Divider, Text } from '@ui/components';

const CreateJobFormComponent = () => {
  const formik = useFormikContext<CreateFormValues>();
  const {  isValid,  handleSubmit } = formik;

  return (
    <>
      <Box>
        <Text variant="subheadSmallBold">Job Details</Text>
        <FieldInput
          isRequired
          name="jobName"
          placeholder="Job Name"
          returnKeyType="next"
          label="Job Name"
          mt="m"
        />
        <FieldInput
          name="jobNumber"
          placeholder="Job Number"
          returnKeyType="next"
          label="Job Number"
          mt="m"
        />
        <FieldInput
          name="siteAddress"
          placeholder="Site Address"
          returnKeyType="next"
          label="Site Address"
          mt="m"
        />
        <FieldInput
          name="fileUpload"
          placeholder="File Upload"
          returnKeyType="next"
          label="File upload"
          mt="m"
        />
      </Box>
      <Divider my="l" />
      <Text variant="subheadSmallBold">Contact Details</Text>
      <FieldInput
        name="contactName"
        placeholder="Contact Name"
        returnKeyType="next"
        mt="m"
        label="Contact Name"
      />
      <FieldInput
        name="contactNumber"
        placeholder="Contact Number"
        returnKeyType="next"
        label="Contact Number"
        mt="m"
      />
      <FieldInput
        name="contactEmail"
        placeholder="Contact Email"
        returnKeyType="next"
        label="Contact Email"
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
