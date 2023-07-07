import {miniUnits} from './utils';

export const sizes = Object.freeze({
  xxxLarge: miniUnits(8), // 64
  xxLarge: miniUnits(6), // 48
  xLarge: miniUnits(5), // 40
  large: miniUnits(3), // 24
  mediumLarge: miniUnits(2.25), //
  base: miniUnits(2), // 16
  medium: miniUnits(1.75), // 14
  small: miniUnits(1.5), // 12
  xSmall: miniUnits(1), // 8
  xxSmall: miniUnits(0.5), // 4
  fullWidth: '100%',
});

export const sizesButtons = Object.freeze({
  sml: miniUnits(10), //72
  small: miniUnits(14), //72
  medium: miniUnits(18), //144
  large: miniUnits(36), //295
  xLarge: miniUnits(45),
  fullWidth: '100%',
});

export const sizesInput = Object.freeze({
  sml: miniUnits(10), //72
  medium: miniUnits(18), //144
  large: miniUnits(36), //295
  xLarge: miniUnits(45),
  fullWidth: '100%',
});
