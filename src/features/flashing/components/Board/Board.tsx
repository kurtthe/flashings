import React from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  CoordsType,
  heightScreen,
  SIZE_POINTER,
  SIZE_POINTER_LAST,
  widthScreen,
} from './types';
import {makeLines} from './utils';
import {serialize, Path as PathType} from 'react-native-redash';
import {GridComponent} from '@features/flashing/components';
import {findCoordsNearest} from '@features/flashing/components/Grid/Grid.utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PointerComponent from '@features/flashing/components/Pointer';

type Props = {
  points: CoordsType[];
  onAddPoint: (newPoint: CoordsType) => void;
  width?: number;
  height?: number;
};
const Board: React.FC<Props> = ({
  points,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
}) => {
  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;

  const [lineNumberSelected, setLineNumberSelected] = React.useState<
    number | undefined
  >();
  const [graphs, setGraphs] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    if (points.length < 1) return;

    const makingLines = makeLines({
      pointers: points,
    });
    if (!makingLines || makingLines.length < 1) return;
    setGraphs(makingLines);
  }, [points]);

  const handlePointer = (event: GestureResponderEvent) => {
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
    <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
      <GestureHandlerRootView>
        <Svg width={widthScreen} height="100%">
          <GridComponent />
          {graphs}
          {points.map((pointRender, index) => (
            <PointerComponent
              onPress={() => {
                setLineNumberSelected(index);
              }}
              key={index}
              cx={pointRender.x}
              cy={pointRender.y}
              r={points.length - 1 === index ? SIZE_POINTER_LAST : SIZE_POINTER}
              fill={colorPointer}
              strokeWidth={borderWidth}
              stroke={colorBorderPointer}
            />
          ))}
        </Svg>
      </GestureHandlerRootView>
    </TouchableOpacity>
  );
};

export default Board;
