import React from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

import { AuthenticateUserScreen } from '../../../authentication/screens/AuthenticateUserScreen';
import { SplashScreen } from '../../screens/SplashScreen';
import { UserBottomNavigator } from '../UserBottomNavigator';

export type MainStackNavigatorParamList = {
  splashScreen: undefined;
  authenticateUserScreen: undefined;
  userBottomNavigator: undefined;
};

const Stack = createStackNavigator<MainStackNavigatorParamList>();

export function MainStackNavigator(): React.JSX.Element {
  const fadeAnimation: StackCardStyleInterpolator = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={{ headerShown: false, cardStyleInterpolator: fadeAnimation }}
    >
      <Stack.Screen name="splashScreen" component={SplashScreen} />
      <Stack.Screen name="authenticateUserScreen" component={AuthenticateUserScreen} />
      <Stack.Screen name="userBottomNavigator" component={UserBottomNavigator} />

    </Stack.Navigator>
  );
}
