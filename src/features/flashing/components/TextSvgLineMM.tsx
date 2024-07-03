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
        positionTextY={newPoints[1] + 10}
        positionTextXRect={newPoints[0] - label.length * 5}
        positionTextYRect={newPoints[1] - 5}
        textValue={label}
      />
    );
  }

  return null;
};

export default TextSvgLineMM;
