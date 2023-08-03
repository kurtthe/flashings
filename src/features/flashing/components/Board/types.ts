import { Dimensions } from 'react-native';
import { scaleLinear } from 'd3-scale';

export type CoordsType = {
  point: PointType;
  sizeLine: string;
};

export type PointType = [number, number];

export type MakeLine = {
  pointers: CoordsType[];
  onPressLine: (numberLine: number) => void;
  isDrawing?: boolean;
};
export const SIZE_POINTER = 4;
export const SIZE_POINTER_LAST = 8;
export const widthScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height;
type Boundaries = [number, number];
export type ScaleFunction = (value: number) => number;

export const rescale =
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
export const rankScale = (value: number) => {
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

export const scalerY = rescale([0, 1000], [0, heightScreen])(rankScale);

export const scalerX = scaleLinear().domain([0, 600]).range([0, widthScreen]);
export type LineSelectedType = CoordsType & { numberLine: number };

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
