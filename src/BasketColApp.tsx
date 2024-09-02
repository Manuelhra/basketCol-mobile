import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { MainMaterialBottomTabs } from './presentation/navigaion/MainMaterialBottomTabs';
import { store as reduxStore } from './presentation/store/redux/store';

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
