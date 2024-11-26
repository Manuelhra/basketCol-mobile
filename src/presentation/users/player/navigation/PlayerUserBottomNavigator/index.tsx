import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { RootState } from '../../../../shared/store/redux/rootReducer';
import { PlayerUserHomeScreen } from '../../screens/PlayerUserHomeScreen';
import { PlayerUserCompetitionsScreen } from '../../screens/PlayerUserCompetitionsScreen';
import { PlayerUserCreateFixtureGameScreen } from '../../screens/PlayerUserCreateFixtureGameScreen';
import { PlayerUserMyTeamScreen } from '../../screens/PlayerUserMyTeamScreen';
import { PlayerUserMyProfileScreen } from '../../screens/PlayerUserMyProfileScreen';
import { getStyles } from './styles';
import { MaterialCommunityIcon } from '../../../../shared/components/MaterialCommunityIcon';

export type PlayerUserBottomNavigatorParamList = {
  home: undefined;
  competitions: undefined;
  createFixtureGame: undefined;
  myTeam: undefined;
  myProfile: undefined;
};

const Tab = createMaterialBottomTabNavigator<PlayerUserBottomNavigatorParamList>();

export function PlayerUserBottomNavigator(): React.JSX.Element {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const styles = getStyles(appTheme);

  const getTabIcon = (iconName: string, focused: boolean, color: string) => (
    <MaterialCommunityIcon
      name={focused ? iconName : `${iconName}-outline`}
      size={focused ? 26 : 24}
      color={focused ? appTheme.colors.text : color}
    />
  );

  const createFixtureIcon = (color: string, focused: boolean) => (
    <View style={styles.createFixtureContainer}>
      <MaterialCommunityIcon
        name="plus-circle"
        style={[
          styles.createFixtureIcon,
          { color: focused ? appTheme.colors.text : color },
        ]}
      />
    </View>
  );

  return (
    <Tab.Navigator
      labeled={false}
      activeColor={appTheme.colors.text}
      activeIndicatorStyle={{ backgroundColor: '' }}
      barStyle={{ backgroundColor: appTheme.colors.background }}
    >
      <Tab.Screen
        name="home"
        component={PlayerUserHomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('home', focused, color),
        }}
      />

      <Tab.Screen
        name="competitions"
        component={PlayerUserCompetitionsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('trophy', focused, color),
        }}
      />

      <Tab.Screen
        name="createFixtureGame"
        component={PlayerUserCreateFixtureGameScreen}
        options={{
          tabBarIcon: ({ color, focused }) => createFixtureIcon(color, focused),
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="myTeam"
        component={PlayerUserMyTeamScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account-group', focused, color),

        }}
      />

      <Tab.Screen
        name="myProfile"
        component={PlayerUserMyProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account', focused, color),

        }}
      />
    </Tab.Navigator>
  );
}
