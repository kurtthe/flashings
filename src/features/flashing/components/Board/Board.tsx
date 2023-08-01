import React from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import Svg from 'react-native-svg';
import {
  CoordsType,
  heightScreen,
  SIZE_POINTER,
  SIZE_POINTER_LAST,
  widthScreen,
} from './types';
import {makeLines} from './utils';
import {GridComponent} from '@features/flashing/components';
import {findCoordsNearest} from '@features/flashing/components/Grid/Grid.utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PointerComponent from '@features/flashing/components/Pointer';
import SvgBoard from '@features/flashing/components/SvgBoard';

export type MODES_BOARD = 'draw' | 'sizes';
type Props = {
  points: CoordsType[];
  onAddPoint: (newPoint: CoordsType) => void;
  width?: number;
  height?: number;
  mode: MODES_BOARD;
};
const Board: React.FC<Props> = ({
  points,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  mode = 'draw',
}) => {
  const [graphs, setGraphs] = React.useState<{
    normal: JSX.Element[];
    select: JSX.Element[];
  }>({normal: [], select: []});

  React.useEffect(() => {
    if (points.length < 1) return;

    const makingLines = makeLines({
      pointers: points,
    });
    setGraphs(makingLines);
  }, [points]);

  const handlePointer = (event: GestureResponderEvent) => {
    if (mode !== 'draw') return;
    const newPosition = findCoordsNearest({
      positionX: event.nativeEvent.locationX,
      positionY: event.nativeEvent.locationY,
    });

    onAddPoint({
      ...newPosition,
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
    </>
  );
};

export default Board;
