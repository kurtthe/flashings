import React from 'react';
import { Rect } from 'react-native-svg';
type Props = {
  positionX: number;
  positionY: number;
  size?: number;
  color?: string;
  borderWidth?: number;
};

const AngleRect: React.FC<Props> = ({
  positionY,
  positionX,
  size = 15,
  color = 'black',
  borderWidth = 1,
}) => {
  return (
    <Rect
      x={positionX}
      y={positionY}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth={borderWidth}
    />
  );
};

export default AngleRect;
