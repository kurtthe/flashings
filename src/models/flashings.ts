export type POINT_TYPE = [number, number];

export type LINE_TYPE = {
  points: POINT_TYPE[];
  pending: number;
  distance: number;
  isLine: boolean;
  letterLine?: string;
};

export type FLASHING_LENGTHS = { qty: number; length: number };

export type FLASHINGS_DATA = {
  id: number;
  colourMaterial: number;
  flashingLengths: FLASHING_LENGTHS[];
  name?: string;
  dataLines: LINE_TYPE[];
  angles: number[];
  parallelRight: boolean;
  endType: TYPE_END_LINES;
  startType: TYPE_END_LINES;
  imgPreview: string | undefined;
  tapered?:
    | {
        front: LINE_TYPE[];
        frontImagePreview: string | undefined;

        back: LINE_TYPE[];
        backImagePreview: string | undefined;
      }
    | undefined;
};

export type MODES_BOARD =
  | 'draw'
  | 'measurements'
  | 'side'
  | 'finish'
  | 'preview'
  | 'end_type'
  | 'screen_shot'
  | 'tapered'
  | 'save_tapered';
export type TYPE_END_LINES =
  | 'none'
  | 'safety1Right'
  | 'safety1Left'
  | 'safety2Right'
  | 'safety2Left'
  | 'break1End'
  | 'break1Start'
  | 'break2End'
  | 'break2Start';
export type TYPE_END_LINES_BREAK =
  | 'none'
  | 'break1End'
  | 'break1Start'
  | 'break2End'
  | 'break2Start';

export type BREAK_END_START_LINE_TYPE = {
  points: [number, number];
  angle: number;
};

export type START_END_LINE_TYPE = {
  typeStart: TYPE_END_LINES;
  typeEnd: TYPE_END_LINES;
  isRightBlueLine: boolean;
  lineStart: LINE_TYPE;
  lineEnd: LINE_TYPE;
};

type SIDES = {
  acrossFront: number;
  offWallDimensionsOverflow: number;
  heightOverall: number;
  offWallDimensionsShroud: number;
  heightOverflowWall: number;
};

export type RAIN_HEAD = SIDES & {
  colourMaterial: string;
  qty: number;
};

export type SUMB = SIDES & {
  type: string;
  colourMaterial: string;
  qty: number;
};
