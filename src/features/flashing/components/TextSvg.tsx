import React from 'react';
import { Rect, Text } from 'react-native-svg';

type Props = {
  positionTextX: number;
  positionTextY: number;
  positionTextXRect?: number;
  positionTextYRect?: number;
  id: number;
  textValue: string;
  fontSize?: number;
  colorLabel?: string;
};

const TextSvg: React.FC<Props> = ({
  fontSize = 14,
  colorLabel = '#000',
  positionTextX,
  positionTextY,
  textValue,
  id,
  positionTextXRect,
  positionTextYRect,
}) => {
  const [textWidth, setTextWidth] = React.useState(30);

  return (
    <>
      {positionTextXRect && positionTextYRect && (
        <Rect
          width={textWidth + 10}
          height={fontSize + 3}
          origin={`${positionTextX}, ${positionTextY}`}
          fill="white"
          y={positionTextYRect}
          x={positionTextXRect}
          rx={0}
          ry={0}
        />
      )}
      <Text
        onLayout={event => {
          setTextWidth(event.nativeEvent.layout.width + 8);
        }}
        key={`backgroundSizeText${id}`}
        textAnchor="middle"
        fill={colorLabel}
        y={positionTextY}
        x={positionTextX}
        fontSize={fontSize}>
        {textValue}
      </Text>
    </>
  );
};
export default TextSvg;
