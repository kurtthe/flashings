import React from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import Svg, {Circle, Path, G, Text} from 'react-native-svg';
import {CoordsType, heightScreen, widthScreen} from './types';
import {makeLine} from './utils';
import {serialize, Path as PathType} from 'react-native-redash';

type Props = {
  width?: number;
  height?: number;
};
const BoardComponent: React.FC<Props> = ({
  width = widthScreen,
  height = heightScreen,
}) => {
  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;
  const sizePointer = 5;

  const [pointers, setPointers] = React.useState<CoordsType[]>([]);
  const [lineNumberSelected, setLineNumberSelected] = React.useState<
    number | undefined
  >();
  const [modalSizeLine, setModalSizeLine] = React.useState(false);
  const [graphs, setGraphs] = React.useState<Array<PathType | null>>([]);

  React.useEffect(() => {
    if (pointers.length < 1) return;

    const makingLines = makeLine({
      pointers,
    });
    if (!makingLines || makingLines.length < 1) return;
    setGraphs(makingLines);
  }, [pointers]);

  const handlePointer = (event: GestureResponderEvent) => {
    const newPointCoordinates = {
      y: event.nativeEvent.locationY,
      x: event.nativeEvent.locationX,
      sizeLine: '?',
    };

    const newPointers = [...pointers, newPointCoordinates];
    setPointers(newPointers);
  };

  const handleSetSize = (tmpSizePointer: string) => {
    if (lineNumberSelected === undefined) return;
    const modifiedPointers = pointers.map((pointer, index) => ({
      ...pointer,
      sizeLine:
        index === lineNumberSelected ? tmpSizePointer : pointer.sizeLine,
    }));
    setPointers(modifiedPointers);
    setModalSizeLine(false);
    setLineNumberSelected(undefined);
  };

  const handleUndo = () => {
    const newPointCoordinates = pointers.slice(0, -1);
    setPointers(newPointCoordinates);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
      <Svg width={widthScreen} height="93%">
        {pointers.map((pointRender, index) => (
          <Circle
            onPress={() => {
              setLineNumberSelected(index);
              setModalSizeLine(true);
            }}
            key={index}
            cx={pointRender.x}
            cy={pointRender.y}
            r={sizePointer}
            fill={colorPointer}
            strokeWidth={borderWidth}
            stroke={colorBorderPointer}
          />
        ))}
        {graphs.map(
          (linePoint, index) =>
            !!linePoint && (
              <G key={`group${index}`}>
                <Path
                  key={index}
                  d={serialize(linePoint)}
                  strokeWidth={1}
                  stroke="#000"
                />
              </G>
            ),
        )}
      </Svg>
    </TouchableOpacity>
  );
};

export default BoardComponent;
