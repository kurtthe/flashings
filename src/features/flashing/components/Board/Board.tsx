import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED,
  widthScreen,
} from './types';
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SvgBoard from '@features/flashing/components/SvgBoard';
import { ModalBottom, ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import { drawLines, drawParallelLines } from "@features/flashing/components/Board/utils";
import { Path } from 'react-native-redash';
import SectionsButton from "@features/flashing/components/SectionsButton";
import { LINE_TYPE, MODES_BOARD, POINT_TYPE } from "@models";
import { isNaN } from "lodash";
import { Box, KeyboardAvoidingBox, ScrollBox } from "@ui/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  lines: LINE_TYPE[];
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: () => void;
  onTape?: ()=> void
  width?: number;
  height?: number;
  changeMode?: (newMode:MODES_BOARD) => void;
  backStep?: () => void;
  mode: MODES_BOARD;
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
  mode = 'draw',
  changeMode,
  rightLinePaint,
  onSave,
  onTape,
  angles=[],
  updateAngle
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null)
  const [indexLineSelected, setIndexLineSelected] = React.useState(0)
  const [visibleKeyboard, setVisibleKeyboard] = React.useState(false)
  const [typeSelected, setTypeSelected] = React.useState<'line' | 'angle'>('line')

  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      widthGraph: width,
      heightGraph: height,
      mode,
      rightLinePaint,
      lineSelected: indexLineSelected,
      typeSelected,
      anglesLines: angles
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint))
    setGraphs(makingLines);
  }, [lines, mode, rightLinePaint, indexLineSelected]);

  React.useEffect(()=>{
    if(mode === "finish" ) {
      modalBottomRef.current?.hide()
      setVisibleKeyboard(false)
    }
    if(mode !== 'measurements') {
      return setVisibleKeyboard(false);
    }
    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: lines[indexLineSelected]?.distance ?? 0,
      angle: angles[indexLineSelected],
    });
    modalBottomRef.current?.show()
    setVisibleKeyboard(true)
  }, [mode, indexLineSelected, graphs])

  const handleDoneSize = (newSize: number, sizeType: 'line' | 'angle') => {
    if (!pointSelected ) return;

    if(isNaN(newSize)) return

    if(sizeType === 'angle'){
      updateAngle && updateAngle(newSize, indexLineSelected)
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
      return changeMode && changeMode('finish')
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
    if(typeSelected === "angle"){
      return setTypeSelected("line");
    }
    const newIndex = indexLineSelected - 1

    if(newIndex <= 0){
      setIndexLineSelected(0)
    }
    if(typeSelected === 'line'){
      setIndexLineSelected(newIndex)
      setTypeSelected('angle')
    }
  }

  const handleOnSave = ()=> {
    onSave && onSave()
  }
  const handleOnTape = ()=> {
    onTape && onTape()
  }

  const validateShowHigher = () => {
    if(!graphs.length) return 0

    const getSelectedLine = graphs[indexLineSelected];
    if(getSelectedLine?.points?.length <= 1) return 0

    if(visibleKeyboard && getSelectedLine.points[1][1] > 384){
      return (getSelectedLine.points[1][1] / indexLineSelected) * -1
    }
    return 0
  }
  return (
    <ScrollBox as={KeyboardAwareScrollView} keyboardShouldPersistTaps="handled" enableOnAndroid showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingBox>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer} >
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} pathParallel={pathParallel} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        onCloseFinish={() => {
          changeMode && changeMode('finish')
        }}
        backdropBackgroundColor="transparent"
        draggable={false}
        ref={modalBottomRef}
        height={350}
        borderRadius={0}>
        <MeasurementLines
          disabledPrevious={indexLineSelected === 0 && typeSelected === 'line'}
          onNext={handleNextLineSelected}
          onPrevious={handleBackLineSelected}
          typeSelected={typeSelected}
          onDone={handleDoneSize}
          dataLine={pointSelected}
        />
      </ModalBottom>
      {mode === "finish" && <SectionsButton onSave={handleOnSave} onSetTape={handleOnTape} />}
      </KeyboardAvoidingBox>
    </ScrollBox>
  );
};

export default Board;
