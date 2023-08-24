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
  validateLineComplete
} from "@features/flashing/utils";
import GuideStepperBoardComponent from "@features/flashing/components/GuideStepperBoard";
import Alert from "@services/general-request/alert";

const BoardContainer = () => {
  const [lines, setLines] = React.useState<LINE_TYPE[]>([]);
  const [stepsDrawing, setDrawing] = React.useState(0)
  const [modeBoard, setModeBoard] = React.useState<MODES_BOARD>('draw');

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
    if(lines.length === 0 || !lines[0].isLine){
      return Alert.show("Please draw a line", "")
    }

    setDrawing(stepsDrawing + 1)
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

  const finishSteps = () => {
    console.log('on finish steps::');
  }

  return (
    <>
      <GuideStepperBoardComponent step={stepsDrawing} onFinish={finishSteps} />
      <BoardComponent
        rightLinePaint={true}
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
