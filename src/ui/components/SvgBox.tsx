import React from 'react';
import {
  BoxProps,
  boxRestyleFunctions,
  color,
  composeRestyleFunctions,
  createRestyleFunction,
} from '@shopify/restyle';
import {Svg, SvgProps} from 'react-native-svg';
import {Theme, useAppRestyle} from '@theme';
import {isNumber} from 'lodash';

import {useAsProp} from '@ui/hooks';
import {forwardRef} from '@ui/utils';

export type ColorThemeValue = keyof Theme['colors'];

/**
 * Decription with color props supported
 * @see https://github.com/react-native-svg/react-native-svg#supported-elements
 */
type RestyleSvgBoxProps = Omit<SvgProps, 'color' | 'fill' | 'stroke'> &
  BoxProps<Theme> & {
    //as: React.FC<SvgProps> | React.ComponentClass<any, any> | React.ComponentClass<SvgProps>;
    size?: number;
    color?: ColorThemeValue;
    fill?: ColorThemeValue;
    stroke?: ColorThemeValue;
    rx?: number;
    d?: string;
    cd?: number;
    cx?: number;
    cy?: number;
    r?: string;
    points?: string;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
  };

export type SvgBoxProps = RestyleSvgBoxProps & {
  _dark?: Omit<RestyleSvgBoxProps, 'as'>;
  _light?: Omit<RestyleSvgBoxProps, 'as'>;
};

const restyleFunctions = composeRestyleFunctions([
  ...boxRestyleFunctions,
  color,
  createRestyleFunction({
    property: 'fill',
    themeKey: 'colors',
  }),
  createRestyleFunction({
    property: 'stroke',
    themeKey: 'colors',
  }),
]);

const SvgBox = forwardRef<SvgBoxProps, Svg>(
  ({style, width, height, as, _dark, _light, size, ...rest}, ref) => {
    const SvgComponent = useAsProp(Svg, as);
    const {
      style: [{fill, stroke, color: currentColor, ...svgStyle}],
      ...props
    } = useAppRestyle(restyleFunctions, {
      ...rest,
      ..._light,
    });

    return (
      <SvgComponent
        ref={ref as any}
        style={[svgStyle, style]}
        {...Object.assign(
          {},
          fill && {fill},
          stroke && {stroke},
          currentColor && {color: currentColor},
        )}
        {...props}
        {...(isNumber(size) && size > 0 && {width: size, height: size})}
        {...((width || height) && {width, height})}
      />
    );
  },
);

export default React.memo(SvgBox) as typeof SvgBox;
