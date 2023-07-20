import React from 'react';
import {
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import Svg, {Circle, Path, G} from 'react-native-svg';
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
  width?: number;
  height?: number;
};
const Board: React.FC<Props> = ({
  width = widthScreen,
  height = heightScreen,
}) => {
  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;

  const [pointers, setPointers] = React.useState<CoordsType[]>([]);
  const [lineNumberSelected, setLineNumberSelected] = React.useState<
    number | undefined
  >();
  const [graphs, setGraphs] = React.useState<Array<PathType | null>>([]);

  React.useEffect(() => {
    if (pointers.length < 1) return;

    const makingLines = makeLines({
      pointers,
    });
    if (!makingLines || makingLines.length < 1) return;
    setGraphs(makingLines);
  }, [pointers]);

  const handlePointer = (event: GestureResponderEvent) => {
    const newPosition = findCoordsNearest({
      positionX: event.nativeEvent.locationX,
      positionY: event.nativeEvent.locationY,
    });

    const newPointCoordinates = {
      ...newPosition,
      sizeLine: '?',
    };

    const newPointers = [...pointers, newPointCoordinates];
    setPointers(newPointers);
  };

  const handleUndo = () => {
    const newPointCoordinates = pointers.slice(0, -1);
    setPointers(newPointCoordinates);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
      <GestureHandlerRootView>
        <Svg width={widthScreen} height="100%">
          <GridComponent />

          {graphs.map(
            (linePoint, index) =>
              !!linePoint && (
                <Path
                  key={index}
                  d={serialize(linePoint)}
                  strokeWidth={1}
                  stroke="#000"
                />
              ),
          )}
          {pointers.map((pointRender, index) => (
            <PointerComponent
              onPress={() => {
                setLineNumberSelected(index);
              }}
              key={index}
              cx={pointRender.x}
              cy={pointRender.y}
              r={
                pointers.length - 1 === index ? SIZE_POINTER_LAST : SIZE_POINTER
              }
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
