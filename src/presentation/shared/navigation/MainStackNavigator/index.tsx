import React from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

import { AuthenticateUserScreen } from '../../../authentication/screens/AuthenticateUserScreen';
import { PublicScreen } from '../../screens/PublicScreen';
import { SplashScreen } from '../../screens/SplashScreen';

export type MainStackNavigatorParamList = {
  splashScreen: undefined;
  authenticateUserScreen: undefined;
  publicScreen: undefined;
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
      <Stack.Screen name="publicScreen" component={PublicScreen} />
    </Stack.Navigator>
  );
}
