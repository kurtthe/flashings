import {isTablet} from '@shared/platform';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const PADDING_BARS = 0;
export const ALIGN_BARS = 0;
export const LINE_OFFSET = 0;

export const SIZE_GRID = 50;

export const WIDTH_SCREEN = isTablet ? width : height;
export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export const COLOR_GRID = '#E1E1E1';
