import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED,
  LINE_TYPE,
  POINT_TYPE,
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

export type MODES_BOARD = 'draw' | 'measurements' | 'side' | 'finish';
type Props = {
  lines: LINE_TYPE[];
  onAddPoint: (newPoint: POINT_TYPE) => void;
  onUpdatePoint: (dataLine: LINE_SELECTED) => void;
  width?: number;
  height?: number;
  changeMode?: (newMode:MODES_BOARD) => void;
  mode: MODES_BOARD;
  rightLinePaint: boolean;
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
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null)
  const [indexLineSelected, setIndexLineSelected] = React.useState(0)
  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      widthGraph: width,
      heightGraph: height,
      mode,
      rightLinePaint,
      lineSelected: indexLineSelected
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint))
    setGraphs(makingLines);
  }, [lines, mode, rightLinePaint, indexLineSelected]);

  React.useEffect(()=>{
    if(mode === "finish" ) {
      modalBottomRef.current?.hide()
    }
    if(mode !== 'measurements') return;

    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: lines[indexLineSelected].distance,
    });
    modalBottomRef.current?.show()
  }, [mode, indexLineSelected])

  const handleDoneSize = (newSize: number) => {
    if (!pointSelected) return;

    const newIndex = indexLineSelected + 1
    const lengthLine = lines.length - 1

    setIndexLineSelected(newIndex >= lengthLine? lengthLine : indexLineSelected)
    onUpdatePoint({ ...pointSelected, sizeLine: newSize });
    if(newIndex > lengthLine){
      changeMode && changeMode('finish')
    }
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint([newPosition.x, newPosition.y]);
  };

  const handleNextLineSelected = ()=>{
    const newIndex = indexLineSelected + 1
    const lengthLine = lines.length - 1

    setIndexLineSelected(newIndex >= lengthLine? lengthLine : newIndex)

    if(newIndex > lengthLine){
      changeMode && changeMode('finish')
    }

  }

  const handleBackLineSelected = ()=>{
    const newIndex = indexLineSelected - 1
    setIndexLineSelected(newIndex <= 0? 0 : newIndex)
  }

  const handleOnSave = ()=> null
  const handleOnTape = ()=> null

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} pathParallel={pathParallel} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        backdropBackgroundColor="transparent"
        backdropClosesSheet={false}
        draggable={false}
        ref={modalBottomRef}
        height={300}
        borderRadius={0}>
        <MeasurementLines onNext={handleNextLineSelected} onPrevious={handleBackLineSelected} dataLine={pointSelected} onDone={handleDoneSize} />
      </ModalBottom>
      {mode === "finish" && <SectionsButton onSave={handleOnSave} onSetTape={handleOnTape} />}
    </>
  );
};

export default Board;
