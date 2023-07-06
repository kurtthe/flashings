import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeProvider, Theme} from '@contexts/Theme';

import {QueryClientProvider} from 'react-query';
import {queryClient} from '@shared/queryClient';
import RootNavigator from '@routes/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {store} from '@core/module/store';
import {Provider} from 'react-redux';
import {Host as PortalProvider} from 'react-native-paper-portal';

export const Application = ({theme}: {theme?: Theme}) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SafeAreaView style={styles.safeAreaView}>
            <NavigationContainer>
              <PortalProvider>
                <RootNavigator />
              </PortalProvider>
            </NavigationContainer>
          </SafeAreaView>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
});
