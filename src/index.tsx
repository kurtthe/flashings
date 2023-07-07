import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeProvider, Theme} from '@contexts/Theme';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@shared/queryClient';
import {RootNavigator} from '@routes/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Application = ({theme}: {theme?: Theme}) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.safeAreaView}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
});
