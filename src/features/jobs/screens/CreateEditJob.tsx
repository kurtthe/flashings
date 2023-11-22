import React from 'react';
import {
  KeyboardAvoidingBox,
  ScrollBox,
} from '@ui/components';
import JobFormContainer from '@features/jobs/containers/JobForm';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateEditJobScreen = () => {
  return (
    <ScrollBox as={KeyboardAwareScrollView} keyboardShouldPersistTaps="handled" enableOnAndroid showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingBox>
        <JobFormContainer />
      </KeyboardAvoidingBox>
    </ScrollBox>
  );
};
export default CreateEditJobScreen;
