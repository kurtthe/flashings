import {CustomFonts} from '@theme/constants';

const buttonVariants = {
  defaults: {
    borderRadius: 's',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 'm',
    py: 's',
    minHeight: 50,
    fontFamily: CustomFonts.LibreFranklin,
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.049, // 0.049 => 0.0035em (fontSize 14)
  },
  solid: {
    backgroundColor: 'primaryBlue',
    color: 'white',
  },
  outline: {
    color: 'primaryBlue',
    borderWidth: 1,
    borderColor: 'buttonBorder',
  },
  ghost: {},
  link: {
    textDecorationLine: 'underline',
    color: 'primaryBlue',
  },
  solidWhite: {
    backgroundColor: 'white',
    color: 'primaryBlue',
  },
  outlineWhite: {
    backgroundColor: 'input',
    color: 'black',
    borderWidth: 1,
    borderColor: 'buttonBorder',
  },
  small: {
    backgroundColor: 'primaryBlueBlue',
    color: 'white',
  }
};

export default buttonVariants;
