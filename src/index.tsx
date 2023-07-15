import React from 'react';
import {StyleSheet} from 'react-native';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@shared/queryClient';
import {RootNavigator} from '@routes/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ThemeProvider from '@theme/ThemeProvider';
import { Host as PortalProvider } from 'react-native-paper-portal';

export const Application = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <PortalProvider>
              <RootNavigator />
            </PortalProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
});
