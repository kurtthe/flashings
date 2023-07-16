import React from 'react';
import {Dimensions} from 'react-native';

import BackgroundArrowsSvg from '@assets/images/background-grid.svg';

export const BackgroundGridResponsive: React.FC<
  React.ComponentProps<typeof BackgroundArrowsSvg>
> = props => (
  <BackgroundArrowsSvg
    {...(Dimensions.get('screen').width > 411 && {
      preserveAspectRatio: 'xMinYMin slice',
      width: '100%',
    })}
    pointerEvents="none"
    {...props}
  />
);
