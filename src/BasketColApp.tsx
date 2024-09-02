import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { store as reduxStore } from './presentation/shared/store/redux/store';
import { MainMaterialBottomTabs } from './presentation/shared/navigation/MainMaterialBottomTabs';

type BasketColAppProps = {};

export const BasketColApp = ({}: BasketColAppProps): React.JSX.Element => {
  return (
    <Provider store={reduxStore}>
    <NavigationContainer>
      <MainMaterialBottomTabs />
    </NavigationContainer>
    </Provider>
  );
};
