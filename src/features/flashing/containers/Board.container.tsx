import React from 'react';
import {
  BoardComponent,
  LINE_SELECTED,
  MenuEditorComponent,
} from '@features/flashing/components';
import {
  calculatePending,
  calculateSizeLine,
  getLastPoint,
  validateLineComplete
} from "@features/flashing/utils";
import GuideStepperBoardComponent from "@features/flashing/components/GuideStepperBoard";
import Alert from "@services/general-request/alert";
import {
  TYPE_ACTIONS_STEP,
  VALUE_ACTIONS
} from "@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type";
import { LINE_TYPE, MODES_BOARD, POINT_TYPE } from "@models";
import { useAppDispatch } from "@hooks/useStore";
import { actions as flashingActions } from "@store/jobs/actions";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {Routes as RoutesJobs } from "@features/jobs/navigation/routes";
import {Routes as RoutesFlashing } from "@features/flashing/navigation/routes";
import { FLASHINGParamsList } from "@features/flashing/navigation/Stack.types";
import { StackPrivateDefinitions, StackPrivateProps } from "@routes/PrivateNavigator";

const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const navigation  = useNavigation<StackPrivateProps>()
  const route = useRoute<RouteProp<FLASHINGParamsList, RoutesFlashing.GUTTER_FLASHING>>();

  const [lines, setLines] = React.useState<LINE_TYPE[]>([]);
  const [stepsDrawing, setDrawing] = React.useState(0)
  const [modeBoard, setModeBoard] = React.useState<MODES_BOARD>('draw');
  const [blueLineIsRight, setBlueLineIsRight] = React.useState(true)
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
    if(newPointCoordinates.length === 0 || !newPointCoordinates[0].isLine){
      setDrawing(0)
      setModeBoard('draw');
    }
    setLines(newPointCoordinates);
  };

  const handleEdit = () => {
    setModeBoard('draw');
    setDrawing(0)
  };

  const handleNext = () => {
    if(lines.length === 0 || !lines[0].isLine){
      return Alert.show("Please draw a line", "")
    }
    const newStep = stepsDrawing + 1
    setDrawing(newStep)
    setModeBoard( newStep ==1 ? 'side': 'measurements');
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

  const handleClear = () => {
    setDrawing(0)
    setModeBoard('draw');
    setLines([]);
  };

  const finishSteps = () => {
    console.log('on finish steps::');
  }

  const changeSettingsBoard = (newSettings: VALUE_ACTIONS) =>{
    const sideBlueLine = newSettings[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE].toLowerCase()
    setBlueLineIsRight(sideBlueLine === 'right');
  }

  const handleSave = ()=>{
    const dataFlashing = route.params.data
    const idJob = route.params?.jobId
    const jobName = route.params?.jobName

    dispatch(flashingActions.addFlashing({idJob,  flashing: {...dataFlashing, dataLines: lines, parallelRight:blueLineIsRight }}));

    navigation.navigate(StackPrivateDefinitions.JOBS, {
      screen: RoutesJobs.JOB_DETAILS,
      params: {
        jobId: idJob,
        jobName
      }
    });
  }
  const handleTape = () => {}

  return (
    <>
      <GuideStepperBoardComponent step={stepsDrawing} onFinish={finishSteps} onChangeOption={changeSettingsBoard} />
      <BoardComponent
        rightLinePaint={ blueLineIsRight}
        lines={lines}
        changeMode={setModeBoard}
        onAddPoint={handleAddPoint}
        onUpdatePoint={handleUpdatePoint}
        onSave={handleSave}
        onTape={handleTape}
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
