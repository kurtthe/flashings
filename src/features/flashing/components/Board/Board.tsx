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

export type MODES_BOARD = 'draw' | 'measurements' | 'side';
type Props = {
  lines: LINE_TYPE[];
  onAddPoint: (newPoint: POINT_TYPE) => void;
  onUpdatePoint: (dataLine: LINE_SELECTED) => void;
  width?: number;
  height?: number;
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
  rightLinePaint,
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null)
  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      onPressLine: onPressLine,
      widthGraph: width,
      heightGraph: height,
      mode,
      rightLinePaint,
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint))
    setGraphs(makingLines);
  }, [lines, mode, rightLinePaint]);

  const onPressLine = (numberLine: number) => {
    setPointSelected({
      numberLine: numberLine,
      sizeLine: lines[numberLine].distance,
    });
    modalBottomRef.current?.show();
  };

  const handleDoneSize = (newSize: number) => {
    modalBottomRef.current?.hide();
    if (!pointSelected) return;

    onUpdatePoint({ ...pointSelected, sizeLine: newSize });
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint([newPosition.x, newPosition.y]);
  };

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} pathParallel={pathParallel} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        backdropClosesSheet={false}
        ref={modalBottomRef}
        height={300}
        borderRadius={0}>
        <MeasurementLines dataLine={pointSelected} onDone={handleDoneSize} />
      </ModalBottom>
    </>
  );
};

export default Board;
