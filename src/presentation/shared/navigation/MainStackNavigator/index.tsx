import React from 'react';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

import { AuthenticationValidationLoadingScreen } from '../../../authentication/screens/AuthenticationValidationLoadingScreen';
import { AuthenticateUserScreen } from '../../../authentication/screens/AuthenticateUserScreen';

export type MainStackNavigatorParamList = {
  authenticationValidationLoadingScreen: undefined;
  authenticateUserScreen: undefined;
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
      initialRouteName="authenticateUserScreen"
      screenOptions={{ headerShown: false, cardStyleInterpolator: fadeAnimation }}
    >
      <Stack.Screen name="authenticationValidationLoadingScreen" component={AuthenticationValidationLoadingScreen} />
      <Stack.Screen name="authenticateUserScreen" component={AuthenticateUserScreen} />
    </Stack.Navigator>
  );
}
