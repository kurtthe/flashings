import React from 'react';
import {
  BoardComponent,
  MenuEditorComponent,
} from '@features/flashing/components';

const BoardContainer = () => {
  return (
    <>
      <BoardComponent />
      <MenuEditorComponent />
    </>
  );
};

export default BoardContainer;
