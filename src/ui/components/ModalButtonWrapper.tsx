import * as React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppTheme} from '@theme';

import ModalWrapper from './ModalWrapper';

type Props = React.ComponentProps<typeof ModalWrapper> & {
  disableBackdropAnimation?: boolean;
};

const PFMModalBottomWrapper = ({
  style,
  backdropStyle,
  disableBackdropAnimation,
  ...rest
}: Props) => {
  const {top: insetTop} = useSafeAreaInsets();
  const theme = useAppTheme();

  const containerStyle = {
    backgroundColor: theme.colors.cards,
    maxHeight:
      Dimensions.get('window').height - (Platform.OS === 'ios' ? insetTop : 0),
  };

  return (
    <ModalWrapper
      style={[styles.container, containerStyle, style]}
      backdropStyle={[backdropStyle]}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      disablePaddingInsetTop
      {...rest}
    />
  );
};

export default React.memo(PFMModalBottomWrapper);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    margin: 0,
    padding: 0,
    marginTop: 'auto',
  },
});
