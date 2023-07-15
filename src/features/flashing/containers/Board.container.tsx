import React from 'react';
import {
  BoardComponent,
  MenuEditorComponent,
} from '@features/flashing/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const BoardContainer = () => {
  return (
    <>
      <BoardComponent />
      <MenuEditorComponent />
    </>
  );
};

export default BoardContainer;
