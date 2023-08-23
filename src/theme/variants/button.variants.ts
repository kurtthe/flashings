import { CustomFonts } from '@theme/constants';

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
  outline: {
    backgroundColor: 'lightBlue',
    color: 'primaryBlue',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 'unset',
    fontWeight: 'bold',
  },
  small: {
    backgroundColor: 'primaryBlue',
    minHeight: 30,
    fontSize: 14,
    color: 'white',
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
  keyboard: {
    width: 50,
    backgroundColor: 'input',
    borderWidth: 1,
    borderColor: 'buttonBorder',
    height: 25,
    marginHorizontal: 'xs',
    marginTop: 's',
  },
  keyboardBig: {
    width: '92%',
    backgroundColor: 'input',
    borderWidth: 1,
    borderColor: 'buttonBorder',
    height: 25,
    marginHorizontal: 'xs',
    marginTop: 's',
  },
};

export default buttonVariants;
