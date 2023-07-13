import React from 'react';
import {AppStatusBar} from '@ui/components';
import {BoardContainer} from '@features/flashing/containers';

const CreateFlashingScreen = () => {
  return (
    <>
      <AppStatusBar />
      <BoardContainer />
    </>
  );
};
export default CreateFlashingScreen;
