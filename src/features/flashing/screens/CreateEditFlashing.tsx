import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box, ScrollBox} from '@ui/components';
import CreateFlashingContainer from '@features/flashing/containers/CreateEditFlashing';

const CreateFlashingScreen = () => {
  return (
    <ScrollBox
      as={KeyboardAwareScrollView}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <Box flex={1}>
        <CreateFlashingContainer />
      </Box>
    </ScrollBox>
  );
};

export default CreateFlashingScreen;
