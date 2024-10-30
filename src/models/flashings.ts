import {BOARD_FLASHINGS_DATA} from './board';

export type FLASHING_LENGTHS = {qty: number; length: number};

export type FLASHINGS_DATA = BOARD_FLASHINGS_DATA & {
  id: number;
  colourMaterial: number;
  flashingLengths: FLASHING_LENGTHS[];
  name?: string;
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
