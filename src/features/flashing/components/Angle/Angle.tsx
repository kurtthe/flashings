import React from 'react';
import { LINE_TYPE } from '@models';
import AngleRect from '@features/flashing/components/AngleRect';
import TextSvg from '@features/flashing/components/TextSvg';
import {
  getPositionRectAngle,
  getPositionTextAngle,
} from '@features/flashing/components/Angle/utils';

type Props = {
  id: any;
  angle: number;
  line: LINE_TYPE;
  isSelected: boolean;
  visible: boolean;
};
const AngleComponent: React.FC<Props> = ({
  id,
  visible,
  angle,
  line,
  isSelected,
}) => {
  const colorSelected = '#DEA000';
  if (!visible) return null;

  if (angle === 90) {
    const sizeRect = 15;

    const angleRectPosition = getPositionRectAngle({
      line,
      sizeRect,
    });
    return (
      <AngleRect
        size={sizeRect}
        positionX={angleRectPosition[0]}
        positionY={angleRectPosition[1]}
      />
    );
  }

  const positionTextAngle = getPositionTextAngle(line);
  return (
    <TextSvg
      id={id}
      colorLabel={isSelected ? colorSelected : '#000'}
      positionTextYRect={positionTextAngle[1] - 13}
      positionTextXRect={positionTextAngle[0] + 5}
      positionTextX={positionTextAngle[0] + 20}
      positionTextY={positionTextAngle[1]}
      textValue={`${angle}°`}
    />
  );
};

export default AngleComponent;
