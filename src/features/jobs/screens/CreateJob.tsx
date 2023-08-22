import React, { useState } from 'react';
import {
  HeaderBackButton,
  HeaderBox,
  Icon,
  KeyboardAvoidingBox,
  ScrollBox,
} from '@ui/components';
import { SafeAreaView } from 'react-native';
import JobFormContainer from '@features/jobs/containers/JobForm';
import { BackIcon, SearchIcon } from '@assets/icons';

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
