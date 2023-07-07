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
    lineHeight: 21,
    letterSpacing: 0.049, // 0.049 => 0.0035em (fontSize 14)
  },
  solid: {
    backgroundColor: 'primary',
    color: 'white',
  },
  outline: {
    color: 'primary',
    borderWidth: 1,
    borderColor: 'buttonBorder',
  },
  ghost: {},
  link: {
    textDecorationLine: 'underline',
    color: 'primary',
  },
  solidWhite: {
    backgroundColor: 'white',
    color: 'primary',
  },
  outlineWhite: {
    backgroundColor: 'input',
    color: 'primary',
    borderWidth: 1,
    borderColor: 'buttonBorder',
  },
};

export default buttonVariants;
