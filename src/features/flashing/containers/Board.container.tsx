import React from 'react';
import {
  BoardComponent,
  CoordsType,
  MenuEditorComponent,
} from '@features/flashing/components';

const BoardContainer = () => {
  const [pointers, setPointers] = React.useState<CoordsType[]>([]);

  const handleAddPoint = (newPoint: CoordsType) => {
    const newPointers = [...pointers, newPoint];
    setPointers(newPointers);
  };

  const handleUndo = () => {
    const newPointCoordinates = pointers.slice(0, -1);
    setPointers(newPointCoordinates);
  };

  const handleNext = () => {};

  return (
    <>
      <BoardComponent points={pointers} onAddPoint={handleAddPoint} />
      <MenuEditorComponent onUndo={handleUndo} onNext={handleNext} />
    </>
  );
};

export default BoardContainer;
