import {isTablet} from '@shared/platform';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const PADDING_BARS = 0;
export const ALIGN_BARS = 0;
export const LINE_OFFSET = 0;

export const SIZE_GRID = isTablet ? 55 : 50;

const standardWidth = 852;
const standardHeight = 852;

export const WIDTH_SCREEN = isTablet ? standardWidth : standardHeight;
export const HEIGHT_SCREEN = standardHeight;
export const COLOR_GRID = '#E1E1E1';
