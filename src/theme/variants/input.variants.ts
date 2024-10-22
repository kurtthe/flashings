import {CustomFonts} from '@theme/constants';
import {isTablet} from '@shared/platform';

const inputVariants = {
  defaults: {
    fontFamily: CustomFonts.LibreFranklin,
    fontWeight: '300',
    fontSize: isTablet ? 20 : 16,
    color: 'textPrimary',
    backgroundColor: 'input',
    paddingHorizontal: 'm',
    height: isTablet ? 80 : 60,
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
  small: {
    backgroundColor: 'transparent',
    color: 'textPrimary',
    borderWidth: 0,
  },
  focused: {
    borderColor: 'inputBorderFocused',
    fontWeight: '700',
  },
  area: {
    height: 150,
  },
};

export default inputVariants;
