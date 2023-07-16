//TODO: we need split the palette in two? primaryDark300 primaryLight300 etc
const palette = {
  // From Figma as of 2022-04-08
  base0: '#FFFFFF',
  base25: '#F8F8FF',
  base50: '#E6E6F5',
  base100: '#CACBDE',
  base200: '#9596B3',
  base300: '#7B7C97',
  base400: '#5F6076',
  base500: '#46475A',
  base700: '#252631',
  base800: '#1B1C24',
  base900: '#111217',
  bodyDropLight: 'rgba(0, 0, 0, 0.5)',
  bodyDropDark: 'rgba(0, 0, 0, 0.5)',
  bodyOverlay: 'rgba(17, 18, 23, 0.7)',
  error200: '#F0B0A1',
  error400: '#EE3F22',
  error500: '#CC1E00',
  navDropLight: 'rgba(17, 18, 23, 0.15)',
  navDropDark: 'rgba(0, 0, 0, 0.25)',
  primary100: '#BFCCFF',
  primary300: '#7B8DDE',
  primary400: '#5B73D7',
  primary500: '#3356D7',
  primary700: '#2A46B9',
  primary900: '#1C2A9A',
  processing200: '#F4CC92',
  scheduled200: '#A9DFE8',
  success100: '#D2E7CE',
  success600: '#57A551',
  success700: '#147911',
  // TODO: Deprecate below colors in lightTheme refresh
  black: '#000',
  blackAlpha500: 'rgba(0,0,0,0.5)',
  blackAlpha250: 'rgba(0,0,0,0.25)',
  charlotte: '#A9DFE8',
  lavender: '#F0B0A1',
  martinique: '#2F3350',
  orange: '#EB6E26',
  peach: '#FC725B',
  peachOrange: '#F4CC92',
  polar: '#F2F8FC',
  transparent: 'rgba(255,255,255,0)',
  white: '#fff',

  primaryBlue: '#0E3A90',
} as const;

export default palette;
