import React from 'react';
import {LINE_TYPE} from '@models';
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
  nextLine?: LINE_TYPE;
  rightLinePaint?: boolean;
};
const AngleComponent: React.FC<Props> = ({
  id,
  angle,
  line,
  isSelected,
  nextLine,
  rightLinePaint = true,
}) => {
  const colorSelected = '#DEA000';

  if (angle === 90) {
    const sizeRect = 15;

    const angleRectPosition = getPositionRectAngle({
      line,
      sizeRect,
      nextLine,
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
      positionTextX={positionTextAngle[0] - 13}
      positionTextY={positionTextAngle[1] + 10}
      textValue={`${angle}°`}
    />
  );
};

export default AngleComponent;
