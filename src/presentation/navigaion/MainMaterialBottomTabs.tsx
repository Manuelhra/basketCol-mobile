import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HostUserHomeScreen } from '../context/users/host/screens/HostUserHomeScreen';
import { PlayerUserHomeScreen } from '../context/users/player/screens/PlayerUserHomeScreen';

type MainMaterialBottomTabsNavigatorProps = {
  home: undefined;
  player: undefined;
}

const Tab = createMaterialBottomTabNavigator<MainMaterialBottomTabsNavigatorProps>();

type MainMaterialBottomTabsProps = {};

export const MainMaterialBottomTabs = ({}: MainMaterialBottomTabsProps): React.JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home"  component={HostUserHomeScreen} />
      <Tab.Screen name="player"  component={PlayerUserHomeScreen} />
    </Tab.Navigator>
  );
};
