import React from 'react';
import { POINT_TYPE } from '@models';
import {
  calculatePointHalf,
  getIndexOfStepForName,
} from '@features/flashing/utils';
import TextSvg from '@features/flashing/components/TextSvg';

type Props = {
  coordinates: POINT_TYPE[];
  step: number;
  label: string;
};

const TextSvgLineMM: React.FC<Props> = ({ coordinates, step, label }) => {
  const measurementIndex = getIndexOfStepForName('measurements');
  const newPoints = calculatePointHalf(coordinates);
  if (step >= measurementIndex) {
    return (
      <TextSvg
        id={Math.random()}
        positionTextX={newPoints[0]}
        positionTextY={newPoints[1]}
        textValue={label}
      />
    );
  }
  console.log('coordinates==>{}', coordinates);
  return null;
};

export default TextSvgLineMM;
