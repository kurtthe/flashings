import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateFormValues } from '@features/jobs/containers/types';
import { Box, Button, Divider, Text } from '@ui/components';

const CreateJobFormComponent = ({}) => {
  const formik = useFormikContext<CreateFormValues>();
  const { errors, isValid, isSubmitting, handleSubmit } = formik;

  return (
    <>
      <Box>
        <Text variant="subheadSmallBold">Job Details</Text>
        <FieldInput
          name="jobName"
          placeholder="Job Name"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Job Name"
          mt="m"
        />
        <FieldInput
          name="jobNumber"
          placeholder="Job Number"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Job Number"
          mt="m"
        />
        <FieldInput
          name="siteAddress"
          placeholder="Site Address"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Site Address"
          mt="m"
        />
        <FieldInput
          name="fileUpload"
          placeholder="File Upload"
          returnKeyType="next"
          isDisabled={isSubmitting}
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
        isDisabled={isSubmitting}
        mt="m"
        label="Contact Name"
      />
      <FieldInput
        name="contactNumber"
        placeholder="Contact Number"
        returnKeyType="next"
        isDisabled={isSubmitting}
        label="Contact Number"
        mt="m"
      />
      <FieldInput
        name="contactEmail"
        placeholder="Contact Email"
        returnKeyType="next"
        isDisabled={isSubmitting}
        label="Contact Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        mt="m"
      />
      <Button mt="l" mb="xl" onPress={() => {}}>
        Create Job
      </Button>
    </>
  );
};

export default CreateJobFormComponent;
