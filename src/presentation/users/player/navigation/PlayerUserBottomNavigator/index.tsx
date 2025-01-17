import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack';

import { RootState } from '../../../../shared/store/redux/rootReducer';
import { getStyles } from './styles';
import { MaterialCommunityIconComponent } from '../../../../shared/components/MaterialCommunityIconComponent';
import { PlayerUserProfileOverviewScreen } from '../../screens/PlayerUserProfileOverviewScreen';
import { TeamOverviewScreen } from '../../../../team/screens/TeamOverviewScreen';
import { PlayerUserCreateFixtureGameScreen } from '../../screens/PlayerUserCreateFixtureGameScreen';
import { LeaguesDiscoveryScreen } from '../../../../competitions/league/screens/LeaguesDiscoveryScreen';
import { LeagueOverviewScreen } from '../../../../competitions/league/screens/LeagueOverviewScreen';
import { LeagueSeasonOverviewScreen } from '../../../../competitions/league/season/screens/LeagueSeasonOverviewScreen';
import { LeagueSeasonFixtureOverviewScreen } from '../../../../competitions/league/season/fixture/screens/LeagueSeasonFixtureOverviewScreen';
import { HomeScreen } from '../../../../shared/screens/HomeScreen';

export type PlayerUserBottomNavigatorParamList = {
  homeScreen: undefined;
  competitionsScreen: undefined;
  createFixtureGameScreen: undefined;
  myTeamScreen: undefined;
  myProfileScreen: { isMyProfileScreen: true } | { isMyProfileScreen: false; playerUserId: string };
};

export type PlayerUserCompetitionsStackNavigatorParamList = {
  leaguesDiscoveryScreen: undefined;
  leagueOverviewScreen: { leagueId: string };
  teamOverviewScreen: { isMyTeamScreen: true } | { isMyTeamScreen: false; teamId: string };
  leagueSeasonOverviewScreen: { leagueSeasonId: string };
  leagueSeasonFixtureOverviewScreen: { leagueSeasonFixtureId: string };
  playerUserProfileOverviewScreen: { isMyProfileScreen: true } | { isMyProfileScreen: false; playerUserId: string };
};

export type PlayerUserMyTeamStackNavigatorParamList = {
  teamOverviewScreen: { isMyTeamScreen: true } | { isMyTeamScreen: false; teamId: string };
  playerUserProfileOverviewScreen: { isMyProfileScreen: true } | { isMyProfileScreen: false; playerUserId: string };
};

const Tab = createMaterialBottomTabNavigator<PlayerUserBottomNavigatorParamList>();
const CompetitionsStack = createStackNavigator<PlayerUserCompetitionsStackNavigatorParamList>();
const MyTeamStack = createStackNavigator<PlayerUserMyTeamStackNavigatorParamList>();

function CompetitionsStackNavigator() {
  return (
    <CompetitionsStack.Navigator initialRouteName="leaguesDiscoveryScreen" screenOptions={{ headerShown: false }}>
      <CompetitionsStack.Screen name="leaguesDiscoveryScreen" component={LeaguesDiscoveryScreen} />
      <CompetitionsStack.Screen name="leagueOverviewScreen" component={LeagueOverviewScreen} />
      <CompetitionsStack.Screen name="teamOverviewScreen" component={TeamOverviewScreen} />
      <CompetitionsStack.Screen name="leagueSeasonOverviewScreen" component={LeagueSeasonOverviewScreen} />
      <CompetitionsStack.Screen name="leagueSeasonFixtureOverviewScreen" component={LeagueSeasonFixtureOverviewScreen} />
      <CompetitionsStack.Screen name="playerUserProfileOverviewScreen" component={PlayerUserProfileOverviewScreen} />
    </CompetitionsStack.Navigator>
  );
}

function MyTeamStackNavigator() {
  return (
    <MyTeamStack.Navigator initialRouteName="teamOverviewScreen" screenOptions={{ headerShown: false }}>
      <MyTeamStack.Screen name="teamOverviewScreen" component={TeamOverviewScreen} initialParams={{ isMyTeamScreen: true }} />
      <MyTeamStack.Screen name="playerUserProfileOverviewScreen" component={PlayerUserProfileOverviewScreen} />
    </MyTeamStack.Navigator>
  );
}

export function PlayerUserBottomNavigator(): React.JSX.Element {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const styles = getStyles(appTheme);

  const getTabIcon = (iconName: string, focused: boolean, color: string) => (
    <MaterialCommunityIconComponent
      name={focused ? iconName : `${iconName}-outline`}
      size={focused ? 26 : 24}
      color={focused ? appTheme.colors.text : color}
    />
  );

  const createFixtureIcon = (color: string, focused: boolean) => (
    <View style={styles.createFixtureContainer}>
      <MaterialCommunityIconComponent
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
        name="homeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('home', focused, color),
        }}
      />

      <Tab.Screen
        name="competitionsScreen"
        component={CompetitionsStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('trophy', focused, color),
        }}
      />

      <Tab.Screen
        name="createFixtureGameScreen"
        component={PlayerUserCreateFixtureGameScreen}
        options={{
          tabBarIcon: ({ color, focused }) => createFixtureIcon(color, focused),
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="myTeamScreen"
        component={MyTeamStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account-group', focused, color),

        }}
      />

      <Tab.Screen
        name="myProfileScreen"
        component={PlayerUserProfileOverviewScreen}
        initialParams={{ isMyProfileScreen: true }}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account', focused, color),

        }}
      />
    </Tab.Navigator>
  );
}
