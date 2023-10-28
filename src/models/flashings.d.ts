export type POINT_TYPE = [number, number];

export type LINE_TYPE = {
	points: POINT_TYPE[];
	pending: number;
	distance: number;
	isLine: boolean;
	letterLine?: string;
};

export type FLASHING_LENGTHS = {qty: number; length: number}

export type FLASHINGS_DATA =  {
	id: number;
	colourMaterial: number;
	flashingLengths: FLASHING_LENGTHS[]
	name?: string;
	dataLines: LINE_TYPE[],
	angles: number[],
	parallelRight: boolean;
};

export type MODES_BOARD = 'draw' | 'measurements' | 'side' | 'finish' | 'preview' | 'end_type';
export type TYPE_END_LINES = 'none' | 'safetyEnd' | 'safetyStart' | 'break1End' | 'break1Start' | 'break2End' | 'break2Start'

type SIDES = {
	acrossFront: number;
	offWallDimensionsOverflow: number;
	heightOverall: number;
	offWallDimensionsShroud:number;
	heightOverflowWall: number;
}

export type RAIN_HEAD = SIDES & {
	colourMaterial: string;
	qty: number;
}

export type SUMB = SIDES &{
	type: string;
	colourMaterial: string;
	qty: number;
}
