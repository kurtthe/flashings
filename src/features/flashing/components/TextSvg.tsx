import React from 'react';
import { Rect, Text } from "react-native-svg";

type Props = {
  positionTextX : number;
  positionTextY : number;
  positionTextXRect : number;
  positionTextYRect : number;
  id: number;
  onPress: (value: number) => void;
  textValue: string;
  fontSize?: number;
  colorLabel?: string;
}

const TextSvg: React.FC<Props> = ({fontSize=14, colorLabel="#000", positionTextX, positionTextY, textValue, onPress, id, positionTextXRect, positionTextYRect}) => {
  const [textWidth, setTextWidth] = React.useState(30);

  return (
    <>
      <Rect
        width={textWidth}
        height="17"
        origin={`${positionTextX}, ${positionTextY}`}
        fill="#fff"
        y={positionTextYRect}
        x={positionTextXRect}
        rx={0}
        ry={0}
      />
      <Text
        onLayout={event => {
          setTextWidth(event.nativeEvent.layout.width + 10);
        }}
        onPress={() => onPress(id)}
        key={`backgroundSizeText${id}`}
        textAnchor="middle"
        fill={colorLabel}
        y={positionTextY}
        x={positionTextX - 3}
        fontSize={fontSize}>
        {textValue}
      </Text>
    </>
  )
}
export default  TextSvg
