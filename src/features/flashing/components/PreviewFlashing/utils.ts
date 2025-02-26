import {LINE_TYPE} from '@models';
import {parse, Path} from 'react-native-redash';
import * as shape from 'd3-shape';
import {scaleLinear} from 'd3-scale';

export const buildLinesForPreview = (
  lines: LINE_TYPE[],
  width: number,
  height: number,
): Path | null => {
  if (!lines.length || lines[0].points.length <= 1) {
    return null;
  }
  const points = lines.map(line => line.points);
  return buildPathLineScale(points.flat(1), width, height);
};

export const buildPathLineScale = (
  points: LINE_TYPE['points'],
  width: number,
  height: number,
) => {
  const allPossibleValues = points.flat();
  const minValue = Math.min(...allPossibleValues) || 0;
  const maxValue = Math.max(...allPossibleValues) || 0;

  const canvasWidth = 500;
  const canvasHeight = 1000;

  const scaleXWidth = width / canvasWidth;
  const scaleYHeight = width / canvasHeight;

  const scaleX = scalerX({
    width: scaleXWidth,
    minDomain: minValue,
    maxDomain: maxValue,
  });
  const scaleY = scalerY({
    heightGraph: scaleYHeight,
    minimumValue: minValue,
    maximumValue: maxValue,
  });

  return parse(
    shape
      .line()
      .x(data => scaleX(data[0]))
      .y(data => scaleY(data[1]))
      .curve(shape.curveLinear)(points) as string,
  );
};

const scalerX = ({
  width,
  minDomain,
  maxDomain,
}: {
  width: number;
  minDomain: number;
  maxDomain: number;
}) => scaleLinear().domain([minDomain, maxDomain]).range([0, width]);

export const scalerY = ({
  minimumValue,
  maximumValue,
  heightGraph,
}: {
  minimumValue: number;
  maximumValue: number;
  heightGraph: number;
}) =>
  scaleLinear().domain([minimumValue, maximumValue]).range([0, heightGraph]);
