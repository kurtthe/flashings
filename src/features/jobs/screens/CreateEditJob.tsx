import React from 'react';
import {KeyboardAvoidingBox, ScrollBox} from '@ui/components';
import JobFormContainer from '@features/jobs/containers/JobForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateEditJobScreen = () => {
  return (
    <ScrollBox keyboardShouldPersistTaps="handled" enableOnAndroid>
      <JobFormContainer />
    </ScrollBox>
  );
};
export default CreateEditJobScreen;
