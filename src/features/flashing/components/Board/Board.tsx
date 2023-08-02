import React from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import {CoordsType, heightScreen, widthScreen} from './types';
import {makeLines} from './utils';
import {findCoordsNearest} from '@features/flashing/components/Grid/Grid.utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SvgBoard from '@features/flashing/components/SvgBoard';
import {ModalBottom, ModalBottomRef} from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';

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
  const [dataModifyLine, setDataModifyLine] = React.useState<
    {numberLine: number; sizeLine: number} | undefined
  >(undefined);
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
    setDataModifyLine({numberLine, sizeLine: 0});
    modalBottomRef.current?.show();
  };

  const handleDoneSize = (newSize: number) => {
    modalBottomRef.current?.hide();
    if (!dataModifyLine) return;

    setDataModifyLine({...dataModifyLine, sizeLine: newSize});
    const updatePoint = points[dataModifyLine.numberLine];
    onUpdatePoint(dataModifyLine.numberLine, {
      ...updatePoint,
      sizeLine: newSize.toString(),
    });
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint({
      point: [newPosition.x, newPosition.y],
      sizeLine: '?',
    });
  };

  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
        <GestureHandlerRootView>
          <SvgBoard
            graphs={graphs}
            points={points}
            showSelectLines={mode !== 'draw'}
          />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        backdropClosesSheet={false}
        ref={modalBottomRef}
        height={300}
        borderRadius={0}>
        <MeasurementLines onDone={handleDoneSize} />
      </ModalBottom>
    </>
  );
};

export default Board;
