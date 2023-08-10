import React from 'react';
import {
  BoardComponent,
  LINE_TYPE,
  MenuEditorComponent,
  POINT_TYPE,
} from '@features/flashing/components';
import { MODES_BOARD } from '@features/flashing/components/Board/Board';
import {
  calculatePending,
  calculateSizeLine,
  getLastPoint,
  validateLineComplete,
} from '@features/flashing/utils';

const BoardContainer = () => {
  const [lines, setLines] = React.useState<LINE_TYPE[]>([]);
  const [modeBoard, setModeBoard] = React.useState<MODES_BOARD>('draw');

  const handleAddPoint = (newPoint: POINT_TYPE) => {
    if (lines.length < 1) {
      console.log('first newPoint::', newPoint);

      const dataLine: LINE_TYPE = {
        points: [newPoint],
        pending: 0,
        distance: 0,
        isLine: false,
      };
      return setLines([dataLine]);
    }

    const lineComplete = validateLineComplete(lines);
    const lastPoint = getLastPoint(lines);

    const dataLine: LINE_TYPE = {
      points: [lastPoint, newPoint],
      pending: calculatePending(lastPoint, newPoint),
      distance: calculateSizeLine(lastPoint, newPoint),
      isLine: true,
    };

    if (!lineComplete) {
      return setLines([dataLine]);
    }
    setLines(prevState => [...prevState, dataLine]);
  };

  const handleUndo = () => {
    const newPointCoordinates = lines.slice(0, -1);
    setLines(newPointCoordinates);
  };

  const handleEdit = () => {
    setModeBoard('draw');
  };

  const handleNext = () => {
    setModeBoard('sizes');
  };

  return (
    <>
      <BoardComponent
        lines={lines}
        onAddPoint={handleAddPoint}
        mode={modeBoard}
      />
      <MenuEditorComponent
        onUndo={handleUndo}
        onEdit={handleEdit}
        onNext={handleNext}
      />
    </>
  );
};

export default BoardContainer;
