import React from 'react';
import { Rect } from 'react-native-svg';
type Props = {
  positionX: number;
  positionY: number;
  size?: number;
};

const AngleRect: React.FC<Props> = ({ positionY, positionX, size = 15 }) => {
  return (
    <Rect
      x={positionX}
      y={positionY}
      width={size}
      height={size}
      fill="white"
      stroke="black"
    />
  );
};

export default AngleRect;
