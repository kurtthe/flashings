import { Dimensions } from 'react-native';
import { scaleLinear } from 'd3-scale';

export type COORDS_TYPE = {
  point: LINE_TYPE;
  sizeLine: string;
};

export type POINT_TYPE = [number, number];

export type MAKE_LINE = {
  lines: LINE_TYPE[];
  onPressLine: (numberLine: number) => void;
  isDrawing?: boolean;
};

export type BUILD_LINE = {
  id: number;
  line: LINE_TYPE;
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

export const CIRCLE_RADIUS = 15;

export type LINE_TYPE = {
  points: POINT_TYPE[];
  pending: number;
  distance: number;
  isLine: boolean;
};

export type DREW_LINE_TYPE = LINE_TYPE & {
  path: JSX.Element | undefined;
};

export type LINE_SELECTED = {
  sizeLine: number;
  numberLine: number;
};
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
