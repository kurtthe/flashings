import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import { scaleBand } from 'd3-scale';
import { LINE_TYPE, POINT_TYPE } from '@features/flashing/components';
import { parse, round, serialize } from 'react-native-redash';
import * as shape from 'd3-shape';

type ScaleColumnType = {
  domainData: string[];
  sizeScreen: number;
  paddingInner?: number;
  paddingOuter?: number;
  align?: number;
};

const scaleColumns = ({
  domainData,
  sizeScreen,
  paddingInner = PADDING_BARS,
  paddingOuter = PADDING_BARS,
  align = ALIGN_BARS,
}: ScaleColumnType) =>
  scaleBand()
    .domain(domainData)
    .range([LINE_OFFSET, sizeScreen - LINE_OFFSET])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter)
    .align(align)
    .round(true);

export const ScaleXBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);

export const ScaleYBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);

export const findClosestNumber = (
  dataNumber: number[],
  valueNumber: number,
) => {
  let closest = dataNumber[0];
  let minDifference = Math.abs(valueNumber - dataNumber[0]);

  for (let i = 1; i < dataNumber.length; i++) {
    const difference = Math.abs(valueNumber - dataNumber[i]);
    if (difference < minDifference) {
      minDifference = difference;
      closest = dataNumber[i];
    }
  }

  return closest;
};

export const calculatePending = (point1: POINT_TYPE, point2: POINT_TYPE) => {
  return (point2[1] - point1[1]) / (point2[0] - point1[0]);
};

const calculateExponential = (value: number, toExponential: number = 2) =>
  Math.pow(value, toExponential);

/**
 * function to  calculate the distance between two points of the line
 * @param point1
 * @param point2
 * D = √(x2-x1)^2 +(y2-y1)^2
 */
export const calculateSizeLine = (
  point1: [number, number],
  point2: [number, number] | undefined,
): number => {
  const pointSecond = !point2 ? point1 : point2;

  const resultSubtractX = pointSecond[0] - point1[0];
  const resultSubtractY = pointSecond[1] - point1[1];

  const plusPoints =
    calculateExponential(resultSubtractX) +
    calculateExponential(resultSubtractY);

  const result = Math.sqrt(plusPoints);
  return round(result, 1);
};

/*
 * discover the equation of the line with pending and one point of line
 * for that it use the follow equations
 * y - y1 = m(x-x1)
 * if m doesn't exist then the equation change for y2= y1+d
 * d is the distance between point and line
 * */
const calculateYOfPoint = (
  point: [number, number],
  pending: number,
  valueXOrDistance: number,
) => {
  const y1 = point[1];

  if ('Infinity' === `${pending}`) {
    return point[1] + valueXOrDistance;
  }

  const x1 = point[0];
  const changeSignY1 = y1 * -1;
  return pending * valueXOrDistance + (x1 + changeSignY1);
};

/*
 * function calculate the  point with the pending and firs point
 * for that it use the follows equations
 * Δx = d/√1+m^2
 * x = x1 + Δx
 * y= mx+b
 * return (x,y)
 * */
export const calculatePointWithNewDistance = (
  point1: [number, number],
  distance: number,
  pending: number,
): POINT_TYPE => {
  const mExponent2 = calculateExponential(pending);
  const denominator = Math.sqrt(1 + mExponent2);

  const deltaX = distance / denominator;

  const xPoint = point1[0] + deltaX;
  const yPoint = calculateYOfPoint(
    point1,
    pending,
    'Infinity' === `${pending}` ? distance : xPoint,
  );

  return [xPoint, yPoint];
};

export const validateLineComplete = (lines: LINE_TYPE[]): boolean => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points.length === 2;
};

export const getLastPoint = (lines: LINE_TYPE[]) => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points[lastLine.points.length - 1];
};

export const calculateParallelLine = ({
  pending,
  points,
}: LINE_TYPE): POINT_TYPE[] => {
  const offset = 10;

  const pointX1 = points[0][0];
  const pointX2 = points[1][0];

  const pointY1 = points[0][1];
  const pointY2 = points[1][1];

  const isVertical = pointX1 === pointX2;
  const isHorizontal = pointY1 === pointY2;

  if (isHorizontal) {
    if (pointY2 > pointX1) {
      return [
        [points[0][0], points[0][1] - offset],
        [points[1][0], points[1][1] - offset],
      ];
    }
    return [
      [points[0][0], points[0][1] + offset],
      [points[1][0], points[1][1] + offset],
    ];
  }

  if (isVertical) {
    if (pointY1 > pointY2) {
      return [
        [points[0][0] - offset, points[0][1]],
        [points[1][0] - offset, points[1][1]],
      ];
    }
    return [
      [points[0][0] + offset, points[0][1]],
      [points[1][0] + offset, points[1][1]],
    ];
  }

  if (pending < 0) {
    if (pointY1 > pointY2) {
      return [
        [points[0][0] - offset, points[0][1] - offset],
        [points[1][0] - offset, points[1][1] - offset],
      ];
    }
    return [
      [points[0][0] + offset, points[0][1] + offset],
      [points[1][0] + offset, points[1][1] + offset],
    ];
  }

  if (pending > 0) {
    if (pointY1 > pointY2) {
      return [
        [points[0][0] - offset, points[0][1] + offset],
        [points[1][0] - offset, points[1][1] + offset],
      ];
    }
    return [
      [points[0][0] + offset, points[0][1] - offset],
      [points[1][0] + offset, points[1][1] - offset],
    ];
  }

  return points;
};

export const calculatePositionText = (
  { pending, points }: LINE_TYPE,
  offset: number = 0.5,
): POINT_TYPE => {
  const isHorizontal = pending === 0;
  const isVertical = 'Infinity' === `${pending}`;

  const pointInit = points[0];
  const pointFinal = points[1];

  if (isHorizontal) {
    return [pointInit[0] + pointFinal[0] / 1.5, pointInit[1] - offset * 25];
  }

  if (isVertical) {
    return [pointInit[0] - offset * 25, (pointInit[1] + pointFinal[1]) / 1.5];
  }

  return [
    (pointInit[0] + pointFinal[0]) / 2 + offset * 25,
    (pointInit[1] + pointFinal[1]) / 2 + offset * 25,
  ];
};

export const buildPathLine = (points: LINE_TYPE['points']) => {
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);
  return serialize(parse(generatorLine(points) as string));
};
