import React from 'react';
import {
  View,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {CoordsType, heightScreen, widthScreen} from './types';
import {makeLine} from './utils';
import {serialize, Path as PathType} from 'react-native-redash';
import {BackgroundGridResponsive} from '@assets/images';
import PointerComponent from '../Pointer';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

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

  const handleChangePosition = (
    dataPoint: CoordsType,
    numberPointer: number,
  ) => {
    console.log('dataPoint: ' + dataPoint);
    console.log('numberPointer: ' + numberPointer);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePointer}
        style={{backgroundColor: 'white'}}>
        <BackgroundGridResponsive style={StyleSheet.absoluteFill} />
        <GestureHandlerRootView style={{flex: 1}}>
          <Svg width={widthScreen} height="93%">
            {pointers.map((pointRender, index) => (
              <PointerComponent
                key={`pointer${Math.random()}`}
                x={pointRender.x}
                y={pointRender.y}
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
        </GestureHandlerRootView>
      </TouchableOpacity>
    </View>
  );
};

export default BoardComponent;
