import {Platform} from 'react-native';

export const typography = {
  primary: Platform.select({
    ios: 'SpaceGrotesk-Regular',
    android: 'SpaceGrotesk-Regular',
  }),

  primaryBold: Platform.select({
    ios: 'SpaceGrotesk-Bold',
    android: 'SpaceGrotesk-Bold',
  }),

  primaryThin: Platform.select({
    ios: 'SpaceGrotesk-Light',
    android: 'SpaceGrotesk-Light',
  }),
};
