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
  fontSize = isTablet ? 17 : 14,
  colorLabel = '#000',
  positionTextX,
  positionTextY,
  textValue,
  id,
  positionTextXRect,
  positionTextYRect,
  pending,
}) => {
  const [textWidth, setTextWidth] = React.useState(30);

  console.log('==>pending::', pending);

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
          transform={`rotate(${pending}, ${positionTextX}, ${positionTextY})`}
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
        transform={`rotate(${pending}, ${positionTextX}, ${positionTextY})`}
        fontSize={fontSize}>
        {textValue}
      </Text>
    </>
  );
};
export default TextSvg;
