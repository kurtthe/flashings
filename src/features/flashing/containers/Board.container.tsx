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
  calculatePointWithNewDistance,
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

    console.log('add dataline::', dataLine);
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
    let newPointOfLine: POINT_TYPE | undefined = undefined;

    const linesUpdated = lines.map((line, index) => {
      if (dataLine.numberLine === index) {
        const point1 = line.points[0];
        const getPointWithNewSize = calculatePointWithNewDistance(
          point1,
          dataLine.sizeLine,
          line.pending,
        );
        newPointOfLine = getPointWithNewSize;
        console.log('update addPoint::', [point1, getPointWithNewSize]);
        console.log('update data::', line);
        console.log('update distance::', dataLine.sizeLine);

        return {
          ...line,
          points: [point1, getPointWithNewSize],
          distance: dataLine.sizeLine,
        };
      }

      if (dataLine.numberLine + 1 === index && newPointOfLine) {
        const point2 = line.points[1];
        return {
          ...line,
          points: [newPointOfLine, point2],
          distance: calculateSizeLine(newPointOfLine, point2),
        };
      }
      return line;
    });
    setLines(linesUpdated);
  };

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
      />
    </>
  );
};

export default BoardContainer;
