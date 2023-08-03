import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  CoordsType,
  heightScreen,
  LineSelectedType,
  widthScreen,
} from './types';
import { makeLines } from './utils';
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SvgBoard from '@features/flashing/components/SvgBoard';
import { ModalBottom, ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import { calculateSizeLine } from '@features/flashing/utils';

export type MODES_BOARD = 'draw' | 'sizes';
type Props = {
  points: CoordsType[];
  onAddPoint: (newPoint: CoordsType) => void;
  width?: number;
  height?: number;
  mode: MODES_BOARD;
  onUpdatePoint: (numberPoint: number, newDataPoint: CoordsType) => void;
};

const Board: React.FC<Props> = ({
  points,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  mode = 'draw',
  onUpdatePoint,
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [pointSelected, setPointSelected] = React.useState<LineSelectedType>();
  const [graphs, setGraphs] = React.useState<JSX.Element[]>([]);

  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    if (points.length < 1) return;

    const makingLines = makeLines({
      pointers: points,
      onPressLine: onPressLine,
      widthGraph: width,
      heightGraph: height,
    });
    setGraphs(makingLines);
  }, [points]);

  const onPressLine = (numberLine: number) => {
    if (!isDrawing) return;
    const pathSelected = points[numberLine];
    setPointSelected({ ...pathSelected, numberLine });
    modalBottomRef.current?.show();
  };

  const handleDoneSize = (newSize: string) => {
    modalBottomRef.current?.hide();
    if (!pointSelected) return;
    const updatePoint: LineSelectedType = {
      ...pointSelected,
      sizeLine: newSize.toString(),
    };

    onUpdatePoint(updatePoint.numberLine, {
      point: updatePoint.point,
      sizeLine: newSize.toString(),
    });
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    const prevPoint = points.slice(-1)[0];
    if (!prevPoint) {
      return onAddPoint({
        point: [newPosition.x, newPosition.y],
        sizeLine: '',
      });
    }

    const sizeLine = calculateSizeLine(prevPoint?.point, [
      newPosition.x,
      newPosition.y,
    ]).toFixed(0);

    points[points.length - 1] = {
      ...prevPoint,
      sizeLine: sizeLine.toString(),
    };

    onAddPoint({
      point: [newPosition.x, newPosition.y],
      sizeLine: '',
    });
  };

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} points={points} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        backdropClosesSheet={false}
        ref={modalBottomRef}
        height={300}
        borderRadius={0}>
        <MeasurementLines point={pointSelected} onDone={handleDoneSize} />
      </ModalBottom>
    </>
  );
};

export default Board;
