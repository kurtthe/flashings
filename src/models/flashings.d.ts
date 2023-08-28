export type POINT_TYPE = [number, number];

export type LINE_TYPE = {
	points: POINT_TYPE[];
	pending: number;
	distance: number;
	isLine: boolean;
	letterLine?: string;
};

export type FLASHINGS_DATA = LINE_TYPE;

export type MODES_BOARD = 'draw' | 'measurements' | 'side' | 'finish';


export type FLASHING_STATE = {
	flashings: FLASHINGS_DATA[]
}
