import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import { scaleBand } from 'd3-scale';
import { PointType } from '@features/flashing/components';

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

export const valuePending = (point1: PointType, point2: PointType) => {
  return (point2[1] - point1[1]) / (point2[0] - point1[0]);
};

const calculateExponential = (value: number, toExponential: number = 2) =>
  Math.pow(value, toExponential);

export const calculateSizeLine = (
  point1: [number, number],
  point2: [number, number] | undefined,
) => {
  if (!point2) {
    return 0;
  }

  const resultSubtractX = point2[0] - point1[0];
  const resultSubtractY = point2[1] - point1[1];

  const plusPoints =
    calculateExponential(resultSubtractX) +
    calculateExponential(resultSubtractY);

  return Math.sqrt(plusPoints);
};
