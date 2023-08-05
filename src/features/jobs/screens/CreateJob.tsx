import React, { useState } from 'react';
import { ScrollBox } from '@ui/components';
import { SafeAreaView } from 'react-native';
import JobFormContainer from '@features/jobs/containers/JobForm';

const CreateJobScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollBox p="m" backgroundColor={'white'} flex={1}>
        <JobFormContainer />
      </ScrollBox>
    </SafeAreaView>
  );
};
export default CreateJobScreen;
