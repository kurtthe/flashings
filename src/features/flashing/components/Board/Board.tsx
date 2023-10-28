import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED, STEPS_BOARD,
  widthScreen
} from "./types";
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import { drawLines, drawParallelLines } from "@features/flashing/components/Board/utils";
import { Path } from 'react-native-redash';
import SectionsButton from "@features/flashing/components/SectionsButton";
import { LINE_TYPE, POINT_TYPE, TYPE_END_LINES } from "@models";
import { isNaN } from "lodash";
import { Box, KeyboardAvoidingBox, ScrollBox } from "@ui/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EndTypesLineComponent, SvgBoard } from "@features/flashing/components";
import { getIndexOfStepForName } from "@features/flashing/utils";

type Props = {
  lines: LINE_TYPE[];
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: () => void;
  onTape?: ()=> void
  width?: number;
  height?: number;
  changeStepBoard?: (newStep:number) => void;
  backStep?: () => void;
  stepBoard: number;
  rightLinePaint: boolean;
  angles?: number[];
  updateAngle?: (newAngle:number, positionAngle:number) => void;
};

const Board: React.FC<Props> = ({
  lines,
  onUpdatePoint,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  stepBoard = 0,
  changeStepBoard,
  rightLinePaint,
  onSave,
  angles=[],
  updateAngle,
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null)
  const [indexLineSelected, setIndexLineSelected] = React.useState(0)
  const [typeSelected, setTypeSelected] = React.useState<'line' | 'angle'>('line')

  const [typeStartLine, setTypeStartLine] = React.useState<TYPE_END_LINES>('none')
  const [typeEndLine, setTypeEndLine] = React.useState<TYPE_END_LINES>('none')

  const isDrawing = STEPS_BOARD[stepBoard] === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      widthGraph: width,
      heightGraph: height,
      step: stepBoard,
      rightLinePaint,
      lineSelected: indexLineSelected,
      typeSelected,
      anglesLines: angles
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint))
    setGraphs(makingLines);
  }, [lines, stepBoard, rightLinePaint, indexLineSelected, typeSelected]);

  React.useEffect(()=>{
    if(STEPS_BOARD[stepBoard] === "finish" ) {
      modalBottomRef.current?.hide()
    }
    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: lines[indexLineSelected]?.distance ?? 0,
      angle: angles[indexLineSelected],
    });
    modalBottomRef.current?.show()
  }, [stepBoard, indexLineSelected, graphs])

  const handleDoneSize = (newSize: number, sizeType: 'line' | 'angle') => {
    if (!pointSelected ) return;

    if(isNaN(newSize)) return

    if(sizeType === 'angle'){
      updateAngle && updateAngle(newSize, indexLineSelected)
      return;
    }
    onUpdatePoint && onUpdatePoint({ ...pointSelected, sizeLine: newSize });
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;

    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint && onAddPoint([newPosition.x, newPosition.y]);
  };

  const handleNextLineSelected = ()=>{

    const newIndex = indexLineSelected + 1
    const lengthLine = lines.length - 1

    if(newIndex > lengthLine){
      return changeStepBoard && changeStepBoard(getIndexOfStepForName('finish'))
    }

    if(newIndex > lengthLine){
      setIndexLineSelected(lengthLine)
      setTypeSelected('line')
      return
    }
      if(typeSelected === 'angle') {
        setIndexLineSelected(newIndex);
        setTypeSelected("line");
        return
      }
      setTypeSelected('angle')
  }

  const handleBackLineSelected = ()=>{
    const newIndex = indexLineSelected - 1
    if(newIndex < 0){
      setIndexLineSelected(0)
    }

    if(typeSelected === "angle"){
      setTypeSelected("line");
      return
    }

    if(typeSelected === 'line'){
      setTypeSelected('angle')
      setIndexLineSelected(newIndex)
    }
  }

  const handleOnSave = ()=> {
    onSave && onSave()
  }
  const handleOnEdit = ()=> {
    changeStepBoard && changeStepBoard(getIndexOfStepForName('measurements'));
    setIndexLineSelected(0)
  }

  return (
    <>
    <ScrollBox as={KeyboardAwareScrollView} keyboardShouldPersistTaps="handled" enableOnAndroid showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingBox>
        <TouchableOpacity activeOpacity={1} onPress={handlePointer} >
          <GestureHandlerRootView>
            <SvgBoard isRight={rightLinePaint} typeEndLine={typeEndLine} typeStartLine={typeStartLine}  step={stepBoard} height={heightScreen} graphs={graphs} pathParallel={pathParallel} />
          </GestureHandlerRootView>
        </TouchableOpacity>
      </KeyboardAvoidingBox>
    </ScrollBox>
      {stepBoard === getIndexOfStepForName('finish') && <SectionsButton onSave={handleOnSave} onEdit={handleOnEdit} />}
      {stepBoard === getIndexOfStepForName('measurements') && <Box height={350} position="absolute" width="100%" bottom={0}>
        <MeasurementLines
          disabledPrevious={indexLineSelected === 0 && typeSelected === 'line'}
          onNext={handleNextLineSelected}
          onPrevious={handleBackLineSelected}
          typeSelected={typeSelected}
          onDone={handleDoneSize}
          dataLine={pointSelected}
          changeMode={changeStepBoard}
        />
      </Box>}
      {stepBoard === getIndexOfStepForName('end_type') && <Box height={450} position="absolute" width="100%" bottom={0}>
        <EndTypesLineComponent changeStartTypeLine={setTypeStartLine} changeEndTypeLine={setTypeEndLine} />
      </Box>
      }
    </>
  );
};

export default Board;
