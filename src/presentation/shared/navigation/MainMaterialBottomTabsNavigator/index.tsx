import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HostUserHomeScreen } from '../../../users/host/screens/HostUserHomeScreen';
import { PlayerUserHomeScreen } from '../../../users/player/screens/PlayerUserHomeScreen';

type MainMaterialBottomTabsNavigatorParamList = {
  home: undefined;
  player: undefined;
};

const Tab = createMaterialBottomTabNavigator<MainMaterialBottomTabsNavigatorParamList>();

export function MainMaterialBottomTabsNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator initialRouteName="home" labeled={false}>
      <Tab.Screen
        name="home"
        options={{
          title: 'Home',
        }}
        component={HostUserHomeScreen}
      />
      <Tab.Screen name="player" component={PlayerUserHomeScreen} />
    </Tab.Navigator>
  );
}

// TODO: Instalar y configurar Stack Navigator
// Lograr tipar de manera correcta el useDispatch, que cuando coloque una acción inválida me muestre un error
// Lograr tipar el useSelector para que me muestre un error cuando coloque un selector inválido
// Crear un stack navigator con la vista que se muestra mientras se valida autenticación y otra donde iría el bottom tabs ya creado
