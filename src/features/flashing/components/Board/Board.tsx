import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_TYPE,
  POINT_TYPE,
  widthScreen,
} from './types';
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SvgBoard from '@features/flashing/components/SvgBoard';
import { ModalBottom, ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import { drawLines } from '@features/flashing/components/Board/utils';

export type MODES_BOARD = 'draw' | 'sizes';
type Props = {
  lines: LINE_TYPE[];
  onAddPoint: (newPoint: POINT_TYPE) => void;
  width?: number;
  height?: number;
  mode: MODES_BOARD;
};

const Board: React.FC<Props> = ({
  lines,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  mode = 'draw',
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      onPressLine: onPressLine,
      widthGraph: width,
      heightGraph: height,
      isDrawing,
    });
    setGraphs(makingLines);
  }, [lines]);

  const onPressLine = (numberLine: number) => {
    console.log('onPressLine::', numberLine);
  };

  // const handleDoneSize = (newSize: string) => {
  //   modalBottomRef.current?.hide();
  //   if (!pointSelected) return;
  //   const updatePoint: LineSelectedType = {
  //     ...pointSelected,
  //     sizeLine: newSize.toString(),
  //   };
  //
  //   onUpdatePoint(updatePoint.numberLine, {
  //     point: updatePoint.point,
  //     sizeLine: newSize.toString(),
  //   });
  // };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint([newPosition.x, newPosition.y]);
  };

  console.log('board graphs::', graphs);
  console.log('board graphs::', graphs[0]?.points);

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      {/*<ModalBottom*/}
      {/*  backdropClosesSheet={false}*/}
      {/*  ref={modalBottomRef}*/}
      {/*  height={300}*/}
      {/*  borderRadius={0}>*/}
      {/*  <MeasurementLines point={pointSelected} onDone={handleDoneSize} />*/}
      {/*</ModalBottom>*/}
    </>
  );
};

export default Board;
