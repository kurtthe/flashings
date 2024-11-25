import {Box, Text} from '@ui/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import type {WebViewProps} from 'react-native-webview';
import Loading from './Loading';

type Props = WebViewProps & {
  handlePostMessage?: () => void;
};

const renderErrorWebView = () => (
  <Box flex={1} alignItems="center">
    <Text>Not Found...</Text>
  </Box>
);

const renderLoading = () => (
  <Box
    style={[StyleSheet.absoluteFill]}
    justifyContent="center"
    alignItems="center"
    bg="cards"
    _dark={{bg: 'backgrounds'}}>
    <Loading />
  </Box>
);

const WebViewComponent = React.forwardRef<WebView, Props>((props, ref) => (
  <Box flex={1}>
    <WebView
      {...props}
      ref={ref}
      renderError={renderErrorWebView}
      renderLoading={renderLoading}
      onLoadEnd={props.handlePostMessage}
      incognito={true}
      cacheEnabled={false}
      autoManageStatusBarEnabled={false}
    />
  </Box>
));

export default WebViewComponent;
