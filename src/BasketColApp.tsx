// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { store as reduxStore } from './presentation/shared/store/redux/store';
import { ThemeManagerComponent } from './presentation/shared/components/ThemeManagerComponent';
import { MainStackNavigator } from './presentation/shared/navigation/MainStackNavigator';
import { tanStackQueryClient } from './presentation/shared/config/tan-stack-query.config';

export function BasketColApp(): React.JSX.Element {
  const scheme = useColorScheme();

  return (
    <QueryClientProvider client={tanStackQueryClient}>
      <Provider store={reduxStore}>
        <ThemeManagerComponent scheme={scheme}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <MainStackNavigator />
          </NavigationContainer>
        </ThemeManagerComponent>
      </Provider>
    </QueryClientProvider>
  );
}
