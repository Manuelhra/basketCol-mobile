import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { store as reduxStore } from './presentation/shared/store/redux/store';
import { MainMaterialBottomTabs } from './presentation/shared/navigation/MainMaterialBottomTabs';
import { ThemeManagerComponent } from './presentation/shared/components/ThemeManagerComponent';

type BasketColAppProps = {};

export const BasketColApp = ({}: BasketColAppProps): React.JSX.Element => {
  const scheme = useColorScheme();

  return (
    <Provider store={reduxStore}>
      <ThemeManagerComponent scheme={scheme}>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <MainMaterialBottomTabs />
        </NavigationContainer>
      </ThemeManagerComponent>
    </Provider>
  );
};
