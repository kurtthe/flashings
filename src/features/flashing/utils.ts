import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import { scaleBand } from 'd3-scale';
import {
  casesLineParallel,
  LINE_TYPE,
  POINT_TYPE,
} from '@features/flashing/components';
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

  const deltaX = pointSecond[0] - point1[0];
  const deltaY = pointSecond[1] - point1[1];

  const sumDeltas = calculateExponential(deltaX) + calculateExponential(deltaY);

  const result = Math.sqrt(sumDeltas);
  return round(result, 0);
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
  console.log('point1::', point1);
  console.log('distance::', distance);
  console.log('pending::', pending);

  const mExponent2 = calculateExponential(pending);
  const denominator = Math.sqrt(1 + mExponent2);

  const deltaX = distance / denominator;

  const xPoint = point1[0] + deltaX;
  const yPoint = calculateYOfPoint(
    point1,
    pending,
    'Infinity' === `${pending}` ? distance : xPoint,
  );

  console.log('new pointX::', xPoint);
  console.log('new yPoint::', yPoint);

  return [round(xPoint, 0), round(yPoint, 0)];
};

export const validateLineComplete = (lines: LINE_TYPE[]): boolean => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points.length === 2;
};

export const getLastPoint = (lines: LINE_TYPE[]) => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points[lastLine.points.length - 1];
};

export const calculateParallelLine = (
  { pending, points }: LINE_TYPE,
  isRight: boolean = true,
): POINT_TYPE[] => {
  const offset = 10;

  const pointX1 = points[0][0];
  const pointX2 = points[1][0];

  const pointY1 = points[0][1];
  const pointY2 = points[1][1];
  const side = isRight ? 'right' : 'left';
  const isHorizontal = pointY1 === pointY2;
  const isVertical = pointX1 === pointX2;

  const pointsLineParallel = casesLineParallel({
    points,
    offset,
  });

  if (isHorizontal) {
    const dataHorizontal = pointsLineParallel.horizontal;
    return pointX2 > pointX1
      ? dataHorizontal.someOnePointMajor[side]
      : dataHorizontal.default[side];
  }

  if (isVertical) {
    const dataVertical = pointsLineParallel.vertical;
    return pointY1 > pointY2
      ? dataVertical.someOnePointMajor[side]
      : dataVertical.default[side];
  }

  if (pending > 0) {
    const dataPendingPositive = pointsLineParallel.pendingPositive;
    return pointY1 > pointY2
      ? dataPendingPositive.someOnePointMajor[side]
      : dataPendingPositive.default[side];
  }

  if (pending < 0) {
    const dataPendingNegative = pointsLineParallel.pendingNegative;
    return pointY1 > pointY2
      ? dataPendingNegative.someOnePointMajor[side]
      : dataPendingNegative.default[side];
  }

  return pointsLineParallel.default;
};

export const calculatePositionText = (
  { pending, points }: LINE_TYPE,
  offset: number = 0.5,
  atPoint: boolean = false
): POINT_TYPE => {
  const isHorizontal = pending === 0;
  const isVertical = 'Infinity' === `${pending}`;

  const pointInit = points[0];
  const pointFinal = points[1];

  if(atPoint){
    return [points[1][0] - offset * 25, points[1][1]]
  }

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

export const buildPathLineParallel = (points: LINE_TYPE['points']) => {
  return parse(shape
      .line()
      .x(data => data[0])
      .y(data => data[1])
      .curve(shape.curveLinear)(points) as string)
};

/*
 * function calculate the  angle between two lines
 * ∠ = arctan((m2-m1)/(1+m1*m2))
 * */
export const calculateAngle = (firstLine: LINE_TYPE, secondLine: LINE_TYPE | undefined)=> {
  if(!secondLine) return undefined

  const m1 = firstLine.pending === Infinity ? 120 : firstLine.pending
  const m2 = secondLine.pending  === Infinity ? 120 : secondLine.pending

  const subtractionPending = m2 - m1
  const multiplePending = m2*m1
  const numerator = 1 + multiplePending
  const result = subtractionPending / numerator
  const angleRad = Math.atan(result)
  let angleDeg = angleRad * 180 / Math.PI

  if(angleDeg <= 0){
    angleDeg = 180 - Math.abs(angleDeg)
  }
  console.log("internal angleDeg::", angleDeg)
  console.log("external angleDeg::", 180 - angleDeg)

  return round(angleDeg, 0);
}
