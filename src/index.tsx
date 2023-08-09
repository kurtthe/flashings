import React from 'react';
import { StyleSheet } from 'react-native';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/queryClient';
import { RootNavigator } from '@routes/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ThemeProvider from '@theme/ThemeProvider';
import { Host as PortalProvider } from 'react-native-paper-portal';
import { Provider as StoreProvider, ProviderProps } from 'react-redux';
import { PersistGate, PersistGateProps } from 'redux-persist/integration/react';

type Props = Pick<PersistGateProps, 'persistor'> & ProviderProps;

export const Application: React.FC<Props> = ({ persistor, store }) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoreProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <PortalProvider>
                  <RootNavigator />
                </PortalProvider>
              </NavigationContainer>
            </QueryClientProvider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
});
