import React from 'react';
import {Rect, Text} from 'react-native-svg';
import {isTablet} from '@shared/platform';

type Props = {
  positionTextX: number;
  positionTextY: number;
  positionTextXRect?: number;
  positionTextYRect?: number;
  id: number;
  textValue: string;
  fontSize?: number;
  colorLabel?: string;
  pending?: number;
};

const TextSvg: React.FC<Props> = ({
  fontSize,
  colorLabel = '#000',
  positionTextX,
  positionTextY,
  textValue,
  id,
  positionTextXRect,
  positionTextYRect,
  pending = 0,
}) => {
  const [textWidth, setTextWidth] = React.useState(30);

  return (
    <Text
      onLayout={event => {
        setTextWidth(event.nativeEvent.layout.width + 8);
      }}
      key={`backgroundSizeText${id}`}
      textAnchor="middle"
      accessibilityLabel="middle"
      fontWeight="bold"
      fill={colorLabel}
      y={positionTextY}
      x={positionTextX}
      transform={`rotate(${Math.abs(pending)}, ${positionTextX}, ${positionTextY})`}
      fontSize={isTablet ? 24 : 14}>
      {textValue}
    </Text>
  );
};
export default TextSvg;
