import {
  CoordsType,
  SIZE_POINTER,
  SIZE_POINTER_LAST,
  widthScreen,
} from '@features/flashing/components/Board';
import {GridComponent} from '@features/flashing/components/index';
import PointerComponent from '@features/flashing/components/Pointer';
import Svg from 'react-native-svg';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  graphs: {normal: JSX.Element[]; select: JSX.Element[]};
  points: CoordsType[];
  showSelectLines?: boolean;
  onPressPoint?: (numberPoint: number) => void;
};
const SvgBoard: React.FC<Props> = ({
  graphs,
  points,
  showSelectLines = false,
  onPressPoint,
}) => {
  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;

  return (
    <Svg width={widthScreen} height="100%">
      <GridComponent />
      {graphs.normal}
      {showSelectLines && graphs.select}
      {points.map((pointRender, index) => (
        <PointerComponent
          onPress={() => onPressPoint && onPressPoint(index)}
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
  );
};
export default SvgBoard;
