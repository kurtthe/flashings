import {CustomFonts} from '@theme/constants';

const inputVariants = {
  defaults: {
    fontFamily: CustomFonts.LibreFranklin,
    fontWeight: '300',
    fontSize: 16,
    color: 'textPrimary',
    backgroundColor: 'input',
    paddingHorizontal: 'm',
    height: 60,
    borderRadius: 's',
    borderWidth: 1,
    borderColor: 'inputBorder',
  },
  error: {
    borderColor: 'errorAlert',
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: 'inputDisabled',
  },
  currency: {
    backgroundColor: 'transparent',
    color: 'secondary',
    fontWeight: '900',
  },
  focused: {
    borderColor: 'inputBorderFocused',
    fontWeight: '700',
  },
};

export default inputVariants;
