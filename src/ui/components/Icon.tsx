import React from 'react';
import { BaseTheme, VariantProps } from '@shopify/restyle';
import Svg from 'react-native-svg';

import { forwardRef } from '@ui/utils';

import SvgBox, { SvgBoxProps } from './SvgBox';

/**
 * Decription with color props supported
 * @see https://github.com/react-native-svg/react-native-svg#supported-elements
 */
export type IconProps = SvgBoxProps & {
  size?: number;
  isDisabled?: boolean;
} & VariantProps<BaseTheme, 'variant'>;

// @ts-ignore
const Icon = forwardRef<IconProps, Svg>((props, ref) => (
  <SvgBox
    ref={ref}
    {...props}
    fill={props.fill}
    size={props.size ?? 25}
  />
));

export default Icon;
