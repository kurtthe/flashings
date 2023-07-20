import {MakeLine} from './types';
import * as shape from 'd3-shape';
import {parse, Path} from 'react-native-redash';

export const makeLines = ({pointers}: MakeLine) => {
  if (pointers.length < 1) return null;
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);

  const linesPointer: Array<Path | null> = pointers.map((point, index) =>
    parse(
      generatorLine([
        [point.x, point.y],
        [pointers[index + 1]?.x || point.x, pointers[index + 1]?.y || point.y],
      ]) as string,
    ),
  );

  return linesPointer;
};
