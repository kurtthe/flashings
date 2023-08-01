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
      y: pointInit.y - scaleNumber * 20,
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
    x: (pointInit.x + pointFinal.x) / 2 + scaleNumber * 25,
    y: (pointInit.y + pointFinal.y) / 2 + scaleNumber * 25,
  };
};

export const makeLines = ({pointers}: MakeLine) => {
  if (pointers.length < 1)
    return {
      normal: [],
      select: [],
    };

  const pathSelect: MakeLine['pointers'] = pointers.map(
    (p, index, allPoints) => ({
      ...p,
      x: p.x + 10,
      y: p.y - 4,
    }),
  );

  return {
    normal: buildLines({pointers, colorLine: 'black'}),
    select: buildLines({
      pointers: pathSelect,
      colorLine: 'blue',
      showLetterLine: false,
    }),
  };
};

const buildLines = ({
  pointers,
  showLetterLine = true,
  colorLine,
}: MakeLine & {colorLine: 'black' | 'blue'; showLetterLine?: boolean}) => {
  const colorPath = colorLine === 'black' ? '#000' : '#0056FF';

  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);

  return pointers.map((point, index) => {
    const fontSize = 20;
    const colorLabel = '#8F94AE';

    const positionText = calculatePositionText(point, pointers[index + 1]);

    const linePoint = parse(
      generatorLine([
        [point.x, point.y],
        [pointers[index + 1]?.x || point.x, pointers[index + 1]?.y || point.y],
      ]) as string,
    );
    if (!showLetterLine) {
      return (
        <PathComponent
          key={`selectLine${index}`}
          d={serialize(linePoint)}
          strokeWidth={1}
          stroke={colorPath}
        />
      );
    }
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
          key={`normalLine${index}`}
          d={serialize(linePoint)}
          strokeWidth={1}
          stroke={colorPath}
        />
      </G>
    );
  });
};
