import React from 'react';
import {
  KeyboardAvoidingBox,
  ScrollBox,
} from '@ui/components';
import JobFormContainer from '@features/jobs/containers/JobForm';

const CreateJobScreen = () => {
  return (
    <ScrollBox showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingBox>
        <JobFormContainer />
      </KeyboardAvoidingBox>
    </ScrollBox>
  );
};
export default CreateJobScreen;
