export type POINT_TYPE = [number, number];

export type LINE_TYPE = {
	points: POINT_TYPE[];
	pending: number;
	distance: number;
	isLine: boolean;
	letterLine?: string;
};

export type FLASHINGS_DATA =  {
	colourMaterial: string;
	qty: number;
	length: number;
	name?: string;
	dataLines: LINE_TYPE[]
};

export type MODES_BOARD = 'draw' | 'measurements' | 'side' | 'finish';

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
