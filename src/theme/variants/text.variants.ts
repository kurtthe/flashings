import { CustomFonts } from '@theme/constants';
import { isTablet } from '@shared/platform';

const textVariants = {
  defaults: {
    color: 'textPrimary',
    fontFamily: CustomFonts.LibreFranklin,
    letterSpacing: 0.049, // 0.049 (fontSize 14) = 0.0035em
    fontSize: isTablet ? 17 : 14,
  },
  headerRegular: {
    fontWeight: '300',
    fontSize: isTablet ? 35 : 32,
    lineHeight: 40,
  },
  headerBold: {
    fontWeight: 'bold',
    fontSize: isTablet ? 35 : 32,
    lineHeight: 40,
  },
  headerExtraBold: {
    fontWeight: '800',
    fontSize: isTablet ? 35 : 32,
    lineHeight: 40,
  },
  subheadLargeLight: {
    fontWeight: '300',
    fontSize: isTablet ? 27 : 24,
    lineHeight: 32,
  },
  subheadLight: {
    fontWeight: '300',
    fontSize: isTablet ? 19 : 16,
    lineHeight: 20,
  },
  subheadSecondary: {
    fontWeight: '600',
    fontSize: isTablet ? 17 : 14,
    lineHeight: 16,
  },
  subheadMedium: {
    fontWeight: '500',
    fontSize: isTablet ? 19 : 16,
    lineHeight: 20,
  },
  subheadLargeBold: {
    fontWeight: 'bold',
    fontSize: isTablet ? 32 : 24,
    lineHeight: 32,
  },
  subheadMediumLink: {
    fontWeight: '500',
    fontSize: isTablet ? 19 : 16,
    lineHeight: 20,
    textDecorationLine: 'underline',
    color: 'primary',
  },
  subheadBold: {
    fontWeight: '800',
    fontSize: isTablet ? 23 : 20,
    lineHeight: 20,
  },
  bodyRegular: {
    fontWeight: 'normal',
    fontSize: isTablet ? 17 : 14,
    lineHeight: 18,
  },
  bodyRegularLabel: {
    fontWeight: 'normal',
    fontSize: isTablet ? 13 : 10,
    lineHeight: 18,
    color: 'textPrimary',
  },
  bodySmallRegular: {
    fontSize: isTablet ? 13 : 11,
    lineHeight: 18,
    color: 'lightGray',
  },
  bodyLabelTextfield: {
    fontWeight: 'normal',
    fontSize: isTablet ? 15 : 12,
    lineHeight: 18,
    color: 'textSecondary',
  },
  bodyBold: {
    fontWeight: '600',
    fontSize: isTablet ? 17 : 14,
    lineHeight: 18,
  },
  bodyMediumLink: {
    fontSize: isTablet ? 17 : 14,
    lineHeight: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
  },
  bodyNumberBlack: {
    fontWeight: '900',
    fontSize: isTablet ? 17 : 14,
    lineHeight: 18,
    color: 'secondary',
  },
  linkTextSmall: {
    fontSize: isTablet ? 13 : 10,
    color: 'primary',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  bodyButtonBold: {
    fontWeight: '600',
    fontSize: isTablet ? 20 : 17,
    lineHeight: 21,
  },
  bodyFooter: {
    fontWeight: '500',
    fontSize: isTablet ? 12 : 8,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
  bodyFooterBold: {
    fontWeight: 'bold',
    fontSize: isTablet ? 12 : 8,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  numeralBig: {
    fontWeight: '900',
    fontSize: isTablet ? 51 : 48,
    // !NOTE: not add lineHeight
    // lineHeight: 57,
    textTransform: 'uppercase',
    color: 'secondary',
  },
  numeralSmall: {
    fontWeight: '900',
    fontSize: isTablet ? 27 : 24,
    // !NOTE: not add lineHeight
    //lineHeight: 28,
    textTransform: 'uppercase',
    color: 'secondary',
  },
  signature: {
    fontFamily: 'Hellodilo',
    fontSize: isTablet ? 31 : 28,
    fontWeight: '400',
    lineHeight: 32,
    color: 'secondary',
  },
  inputLabel: {
    fontWeight: '400',
    fontSize: isTablet ? 17 : 14,
    lineHeight: 14,
    color: 'textSecondary',
  },
  inputError: {
    fontWeight: '400',
    fontSize: isTablet ? 15 : 12,
    lineHeight: 15,
    color: 'errorAlert',
  },
  // ALREADY MODIFIED AND IN USE
  subheadSmall: {
    fontWeight: '600',
    fontSize: isTablet ? 22 : 16,
    marginVertical: isTablet ? 'xs' : 'unset',
    lineHeight: 20,
  },
  subheadSmallTablet: {
    fontWeight: '600',
    fontSize: isTablet ? 29 : 26,
    lineHeight: 30,
    marginVertical: 'xs',
  },
  subheadSmallBold: {
    fontWeight: 'bold',
    fontSize: isTablet ? 19 : 16,
    lineHeight: 20,
  },
  lightGraySmallText: {
    fontWeight: '500',
    fontSize: isTablet ? 16 : 13,
    lineHeight: 16,
    color: 'lightGray',
  },
  menuEditor: {
    color: 'textGray',
    fontFamily: CustomFonts.LibreFranklin,
    letterSpacing: 0.049, // 0.049 (fontSize 14) = 0.0035em
    fontSize: isTablet ? 16 : 12,
  },
  menuEditorTablet: {
    color: 'textGray',
    fontFamily: CustomFonts.LibreFranklin,
    fontSize: isTablet ? 21 : 18,
  },
  typeJobActive: {
    color: 'mustard',
    textDecorationLine: 'underline',
    textDecorationColor: 'mustard',
  },
  typeJob: {
    color: 'textGray',
  },
};

export default textVariants;
