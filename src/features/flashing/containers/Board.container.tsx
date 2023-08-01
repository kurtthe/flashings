import React from 'react';
import {
  BoardComponent,
  CoordsType,
  MenuEditorComponent,
} from '@features/flashing/components';
import {MODES_BOARD} from '@features/flashing/components/Board/Board';

const BoardContainer = () => {
  const [pointers, setPointers] = React.useState<CoordsType[]>([]);
  const [modeBoard, setModeBoard] = React.useState<MODES_BOARD>('draw');

  const handleAddPoint = (newPoint: CoordsType) => {
    const newPointers = [...pointers, newPoint];
    setPointers(newPointers);
  };

  const handleUpdatePoint = (numberPoint: number, newDataPoint: CoordsType) => {
    setPointers(prevPointers => {
      prevPointers[numberPoint] = newDataPoint;
      return prevPointers;
    });
  };
  const handleUndo = () => {
    const newPointCoordinates = pointers.slice(0, -1);
    setPointers(newPointCoordinates);
  };

  const handleNext = () => {
    setModeBoard('sizes');
  };

  return (
    <>
      <BoardComponent
        points={pointers}
        onAddPoint={handleAddPoint}
        onUpdatePoint={handleUpdatePoint}
        mode={modeBoard}
      />
      <MenuEditorComponent onUndo={handleUndo} onNext={handleNext} />
    </>
  );
};

export default BoardContainer;
