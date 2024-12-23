import {CustomFonts} from '@theme/constants';
import {isTablet} from '@shared/platform';

const buttonVariants = {
  defaults: {
    borderRadius: 's',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 'm',
    py: isTablet ? 'm' : 's',
    minHeight: 50,
    fontFamily: CustomFonts.LibreFranklin,
    fontWeight: '600',
    fontSize: isTablet ? 22 : 17,
    letterSpacing: 0.049, // 0.049 => 0.0035em (fontSize 14)
  },
  solid: {
    backgroundColor: 'primaryBlue',
    color: 'white',
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
  outlineWhiteSmall: {
    backgroundColor: 'input',
    color: 'black',
    borderWidth: 1,
    borderColor: 'buttonBorder',
    fontSize: 14,
  },

  outline: {
    backgroundColor: 'lightBlue',
    color: 'primaryBlue',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 'unset',
    fontWeight: 'bold',
  },
  textSmall: {
    backgroundColor: 'white',
    fontSize: isTablet ? 13 : 11,
    color: 'primaryBlue',
    minHeight: 'auto',
    px: 'xs',
    py: 'xs',
  },
  small: {
    backgroundColor: 'primaryBlue',
    minHeight: 30,
    fontSize: isTablet ? 18 : 14,
    color: 'white',
  },
  smallDelete: {
    backgroundColor: 'error500',
    minHeight: 30,
    fontSize: 14,
    color: 'white',
  },
  smallWhite: {
    px: 'unset',
    backgroundColor: 'white',
    fontSize: isTablet ? 18 : 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
  smallMenu: {
    minHeight: 30,
    fontSize: 12,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  smallMenuActive: {
    backgroundColor: 'primaryBlue',
    minHeight: 30,
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  delete: {
    backgroundColor: 'error500',
    color: 'white',
  },
  endType: {
    width: 100,
    backgroundColor: 'input',
    borderWidth: 1,
    borderColor: 'buttonBorder',
    height: 50,
    marginHorizontal: 'xs',
    marginTop: 's',
    fontSize: 20,
  },
};

export default buttonVariants;
