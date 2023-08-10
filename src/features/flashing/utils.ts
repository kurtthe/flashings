import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import { scaleBand } from 'd3-scale';
import { LINE_TYPE, POINT_TYPE } from '@features/flashing/components';
import { round } from 'react-native-redash';

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
 * */
const calculateYOfPoint = (
  point: [number, number],
  pending: number,
  valueX: number,
) => {
  const y1 = point[1];
  const x1 = point[0];
  const changeSignY1 = y1 * -1;
  return pending * valueX + (x1 + changeSignY1);
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
) => {
  const mExponent2 = calculateExponential(pending);
  const denominator = Math.sqrt(1 + mExponent2);

  const deltaX = distance / denominator;

  const xPoint = point1[0] + deltaX;
  const yPoint = calculateYOfPoint(point1, pending, xPoint);

  return [xPoint, yPoint];
};

export const validateLineComplete = (lines: LINE_TYPE[]): boolean => {
  const lastLine = lines[lines.length - 1];
  console.log('lastLine.points.length::', lastLine.points.length);
  return lastLine.points.length === 2;
};

export const getLastPoint = (lines: LINE_TYPE[]) => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points[lastLine.points.length - 1];
};
