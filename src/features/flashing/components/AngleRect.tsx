import React from 'react';
import { Rect } from 'react-native-svg';
type Props = {
  positionX: number;
  positionY: number;
};

const AngleRect: React.FC<Props> = ({ positionY, positionX }) => {
  return (
    <Rect
      x={positionX}
      y={positionY}
      width={15}
      height={15}
      fill="white"
      stroke="black"
    />
  );
};

export default AngleRect;
