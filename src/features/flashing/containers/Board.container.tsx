import React from 'react';
import {
  BoardComponent,
  LINE_SELECTED,
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
import { ButtonMenu } from '@features/flashing/components/ButtonMenu';

const BoardContainer = () => {
  const [lines, setLines] = React.useState<LINE_TYPE[]>([]);
  const [modeBoard, setModeBoard] = React.useState<MODES_BOARD>('draw');
  const [paintLineRight, setPaintLineRight] = React.useState<boolean>(true);

  const handleAddPoint = (newPoint: POINT_TYPE) => {
    if (lines.length < 1) {
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
  const handleUpdatePoint = (dataLine: LINE_SELECTED) => {
    const linesUpdated = lines.map((line, index) => {
      if (dataLine.numberLine === index) {
        return {
          ...line,
          distance: dataLine.sizeLine,
        };
      }
      return line;
    });
    setLines(linesUpdated);
  };

  const handleClear = () => setLines([]);

  return (
    <>
      <ButtonMenu onChangeSide={setPaintLineRight} />
      <BoardComponent
        rightLinePaint={paintLineRight}
        lines={lines}
        onAddPoint={handleAddPoint}
        onUpdatePoint={handleUpdatePoint}
        mode={modeBoard}
      />
      <MenuEditorComponent
        onUndo={handleUndo}
        onEdit={handleEdit}
        onNext={handleNext}
        onEraser={handleClear}
      />
    </>
  );
};

export default BoardContainer;
