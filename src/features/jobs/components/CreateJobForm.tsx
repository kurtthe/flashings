import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateFormValues } from '@features/jobs/containers/types';
import { Box, Button, Divider, Text } from "@ui/components";

const CreateJobForm = ({}) => {
  const formik = useFormikContext<CreateFormValues>();
  const { errors, isValid, isSubmitting, handleSubmit } = formik;

  return (
    <>
      <Box>
        <Text variant="subheadSmall">Job Details</Text>
        <FieldInput
          name="jobName"
          placeholder="Job Name"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Job Name"
        />
        <FieldInput
          name="jobNumber"
          placeholder="Job Number"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Job Number"
        />
        <FieldInput
          name="siteAddress"
          placeholder="Site Address"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="Site Address"
        />
        <FieldInput
          name="fileUpload"
          placeholder="File Upload"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="File upload"
        />
      </Box>
      <Divider my="l" mx="l" />
        <Text variant="subheadSmall">Contact Details</Text>
        <FieldInput
          name="contactName"
          placeholder="Contact Name"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="File upload"
        />
        <FieldInput
          name="contactNumber"
          placeholder="Contact Number"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="File upload"
        />
        <FieldInput
          name="contactEmail"
          placeholder="Contact Email"
          returnKeyType="next"
          isDisabled={isSubmitting}
          label="File upload"
        />
          <Button mt="l" mb="xl" onPress={() => {}}>
            Create Job
          </Button>
      </Box>
    </>
  );
};
