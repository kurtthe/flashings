import {CoordsType, LETTER_LINES, MakeLine} from './types';
import * as shape from 'd3-shape';
import {parse, serialize} from 'react-native-redash';
import React from 'react';
import {Path as PathComponent, Text, G} from 'react-native-svg';

const calculatePositionText = (
  pointInit: CoordsType,
  pointFinal: CoordsType | undefined,
) => {
  if (!pointFinal) {
    return {
      x: 0,
      y: 0,
    };
  }

  const scaleNumber = 0.5;
  const isHorizontal = pointInit.y === pointFinal.y;
  const isVertical = pointInit.x === pointFinal.x;

  if (isHorizontal) {
    return {
      y: pointInit.y - scaleNumber * 6,
      x: (pointInit.x + pointFinal.x) / 2,
    };
  }

  if (isVertical) {
    return {
      y: (pointInit.y + pointFinal.y) / 2,
      x: pointInit.x - scaleNumber * 20,
    };
  }

  return {
    x: (pointInit.x + pointFinal.x) / 2 + scaleNumber * 20,
    y: (pointInit.y + pointFinal.y) / 2 + scaleNumber * 20,
  };
};

export const makeLines = ({pointers}: MakeLine) => {
  if (pointers.length < 1) return null;
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);

  return pointers.map((point, index) => {
    const fontSize = 20;
    const colorLabel = '#8F94AE';

    const positionText = calculatePositionText(point, pointers[index + 1]);

    console.log('point.x::', point.x);
    console.log('point.y::', point.y);

    console.log('point+1.x::', pointers[index + 1]?.x || point.x);
    console.log('point+1.y::', pointers[index + 1]?.y || point.y);

    const linePoint = parse(
      generatorLine([
        [point.x, point.y],
        [pointers[index + 1]?.x || point.x, pointers[index + 1]?.y || point.y],
      ]) as string,
    );
    return (
      <G>
        <Text
          textAnchor="middle"
          fill={colorLabel}
          fontSize={fontSize}
          x={positionText.x}
          y={positionText.y}>
          {LETTER_LINES[index]}
        </Text>
        <PathComponent
          key={index}
          d={serialize(linePoint)}
          strokeWidth={1}
          stroke="#000"
        />
      </G>
    );
  });
};
