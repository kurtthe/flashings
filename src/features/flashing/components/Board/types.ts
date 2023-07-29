import {Dimensions} from 'react-native';
import {scaleLinear} from 'd3-scale';

export type CoordsType = {
  x: number;
  y: number;
  sizeLine: string;
};

export type MakeLine = {
  pointers: CoordsType[];
};
export const SIZE_POINTER = 4;
export const SIZE_POINTER_LAST = 8;
export const widthScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height;
type Boundaries = [number, number];
type ScaleFunction = (value: number) => number;

const rescale =
  (from: Boundaries, to: Boundaries) =>
  (scale: ScaleFunction): ScaleFunction => {
    const scaledFrom = from.map(scale);
    const ratio = (to[1] - to[0]) / (scaledFrom[1] - scaledFrom[0]);
    return value => (scale(value) - scaledFrom[0]) * ratio + to[0];
  };
const log = (value: number, base: number) => Math.log(value) / Math.log(base);

const getLogCoord = (abs: number) => {
  const base = 10 + 1000 / abs;
  return log(abs, base);
};
const rankScale = (value: number) => {
  const LINEAR_BOUND = 1;
  const LINEAR_DISTANCE = 0.1;
  const LINEAR_RATIO = LINEAR_DISTANCE / LINEAR_BOUND;
  const LINEAR_LOG_AMEND = LINEAR_DISTANCE - Math.log10(LINEAR_BOUND);

  const abs = Math.abs(value);

  const absCoord =
    abs < LINEAR_BOUND
      ? abs * LINEAR_RATIO
      : getLogCoord(abs) + LINEAR_LOG_AMEND;
  return Math.sign(value) * absCoord;
};

export const CIRCLE_RADIUS = 15;
export const scalerX = ({
  minDomain,
  maxDomain,
  width = widthScreen,
  padding = 0,
}: {
  minDomain: number;
  maxDomain: number;
  width?: number;
  padding?: number;
}) =>
  scaleLinear()
    .domain([minDomain, maxDomain])
    .range([padding, width - padding]);

export const scalerY = ({
  minValue,
  maxValue,
  padding = 0,
  height = heightScreen,
}: {
  minValue: number;
  maxValue: number;
  padding?: number;
  height?: number;
}) =>
  rescale([minValue, maxValue || 1], [padding, height - padding])(rankScale);

export const LETTER_LINES = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];
