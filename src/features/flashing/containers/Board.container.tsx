import React from 'react';
import {
  BoardComponent,
  LINE_SELECTED,
  MenuEditorComponent, STEPS_BOARD
} from "@features/flashing/components";
import {
  calculateAngle,
  calculatePending,
  calculateSizeLine, getIndexOfStepForName,
  getLastPoint,
  validateLineComplete
} from "@features/flashing/utils";
import GuideStepperBoardComponent from "@features/flashing/components/GuideStepperBoard";
import Alert from "@services/general-request/alert";
import {
  TYPE_ACTIONS_STEP,
  VALUE_ACTIONS
} from "@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type";
import { LINE_TYPE, MODES_BOARD, POINT_TYPE, TYPE_END_LINES } from "@models";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { actions as flashingActions } from "@store/jobs/actions";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {Routes as RoutesJobs } from "@features/jobs/navigation/routes";
import {Routes as RoutesFlashing } from "@features/flashing/navigation/routes";
import { FlashingParamsList } from "@features/flashing/navigation/Stack.types";
import { StackPrivateDefinitions, StackPrivateProps } from "@routes/PrivateNavigator";
import { jobData } from "@store/jobs/selectors";

const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const navigation  = useNavigation<StackPrivateProps>()
  const route = useRoute<RouteProp<FlashingParamsList, RoutesFlashing.BOARD_FLASHING>>();

  const [lines, setLines] = React.useState<LINE_TYPE[]>([]);
  const [anglesLines, setAnglesLines] = React.useState<number[]>([]);
  const [stepBoard, setStepBoard] = React.useState(0)
  const [blueLineIsRight, setBlueLineIsRight] = React.useState(true);
  const [startTypeLine, setStartTypeLine] = React.useState<TYPE_END_LINES>('none')
  const [endTypeLine, setEndTypeLine] = React.useState<TYPE_END_LINES>('none')

  const dataJob = useAppSelector((state) => jobData(state, route.params?.jobId));

  React.useEffect(()=>{
    const dataFlashing = route.params.data;
    if(dataFlashing.dataLines.length > 0){
      console.log("dataFlashing.startType::", dataFlashing.startType)
      console.log("dataFlashing.endType::", dataFlashing.endType)

      setLines(dataFlashing.dataLines);
      setBlueLineIsRight(dataFlashing.parallelRight);
      setStartTypeLine(dataFlashing.startType);
      setEndTypeLine(dataFlashing.endType);
      return;
    }
    setLines([])
  }, [route.params.data])

  React.useEffect(()=> {
    if(lines.length < 2) return
    const newAngles = lines.map((line, index, arrayLines)=> {
      if(!anglesLines[index]){
        return calculateAngle(line, arrayLines[index + 1])?? 0
      }
      return anglesLines[index]
    })
    setAnglesLines(newAngles)
  }, [lines])
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

    const validAddNewPoint = lines.find((line)=> {
      return JSON.stringify(line.points[0]) === JSON.stringify(newPoint)
    })
    if(validAddNewPoint) return

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
      setStepBoard(getIndexOfStepForName('draw'))
    }
    setLines(newPointCoordinates);
  };

  const handleBack = () => {
    const newStep = stepBoard - 1;
    if(newStep < 0) return;
    setStepBoard(newStep)
  };

  const handleNext = () => {
    if(stepBoard === getIndexOfStepForName('finish')){
      handleSave()
      return
    }

    if(lines.length === 0 || !lines[0].isLine){
      return Alert.show("Please draw a line", "")
    }
    const newStep = stepBoard + 1
    setStepBoard(newStep)

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
    setStepBoard(getIndexOfStepForName('draw'))

    setLines([]);
  };

  const finishSteps = () => {
    console.log('on finish steps::');
  }

  const changeSettingsBoard = (newSettings: VALUE_ACTIONS) =>{
    const sideBlueLine = newSettings[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE].toLowerCase()
    setBlueLineIsRight(sideBlueLine === 'right');
  }

  const handleUpdateAngle = (newAngle:number, positionAngle:number) => {
    const anglesUpdated = anglesLines.map((angle, index) => {
      if(index === positionAngle ){
        return newAngle
      }
      return angle
    })
    setAnglesLines(anglesUpdated);
  }

  const handleSave = ()=>{
    const dataFlashing = route.params.data
    const idJob = route.params?.jobId

    dispatch(flashingActions.addEditFlashing({
      idJob,
      flashing: {
        ...dataFlashing,
        dataLines: lines,
        parallelRight:blueLineIsRight,
        angles: anglesLines,
        endType: endTypeLine,
        startType:startTypeLine
      }}));

    navigation.navigate(StackPrivateDefinitions.JOBS, {
      screen: RoutesJobs.JOB_DETAILS,
      params: {
        jobId: idJob,
        jobName: dataJob?.name
      }
    });
  }
  return (
    <>
      <GuideStepperBoardComponent step={stepBoard} onFinish={finishSteps} onChangeOption={changeSettingsBoard} />
      <BoardComponent
        rightLinePaint={blueLineIsRight}
        lines={lines}
        changeStepBoard={setStepBoard}
        onAddPoint={handleAddPoint}
        onUpdatePoint={handleUpdatePoint}
        onSave={handleSave}
        stepBoard={stepBoard}
        backStep={handleBack}
        angles={anglesLines}
        updateAngle={handleUpdateAngle}
        startTypeLine={startTypeLine}
        endTypeLine={endTypeLine}
        changeStartTypeLine={setStartTypeLine}
        changeEndTypeLine={setEndTypeLine}
      />
      <MenuEditorComponent
        disabledBack={stepBoard === getIndexOfStepForName('draw')}
        disabledUndo={lines.length === 0 || stepBoard !== getIndexOfStepForName('draw')}
        disabledEraser={lines.length === 0}
        disabledLibrary={true}
        onUndo={handleUndo}
        onBack={handleBack}
        onNext={handleNext}
        onEraser={handleClear}
      />
    </>
  );
};

export default BoardContainer;
