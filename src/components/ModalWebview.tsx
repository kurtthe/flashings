import React from 'react';
import {Modal} from 'react-native';
import WebView from './WebView';
import ModalBottom, {ModalBottomRef} from './ModalBottom';
import {Box, Icon, IconButton} from '@ui/components';
import {CloseIcon} from '@assets/icons';

type Props = {
  visible: boolean;
  url: string;
};

const ModalWebview: React.FC<Props> = ({visible, url}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();

  React.useEffect(() => {
    if (visible) {
      modalBottomRef.current?.show();
      return;
    }
    modalBottomRef.current?.hide();
  }, [visible]);

  return (
    <ModalBottom ref={modalBottomRef} height={800} draggable={false}>
      <Box p="m" justifyContent="flex-start" flex={1}>
        <Box width="100%" alignItems="flex-end">
          <IconButton
            icon={<Icon as={CloseIcon} color="base300" />}
            onPress={() => modalBottomRef.current?.hide()}
          />
        </Box>
        <WebView source={{uri: url}} />
      </Box>
    </ModalBottom>
  );
};

export default ModalWebview;
