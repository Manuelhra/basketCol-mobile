import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack';

import { RootState } from '../../../../shared/store/redux/rootReducer';
import { PlayerUserHomeScreen } from '../../screens/PlayerUserHomeScreen';
import { getStyles } from './styles';
import { MaterialCommunityIconComponent } from '../../../../shared/components/MaterialCommunityIconComponent';
import { PlayerUserProfileOverviewScreen } from '../../screens/PlayerUserProfileOverviewScreen';
import { TeamOverviewScreen } from '../../../../team/screens/TeamOverviewScreen';
import { PlayerUserCreateFixtureGameScreen } from '../../screens/PlayerUserCreateFixtureGameScreen';
import { LeaguesDiscoveryScreen } from '../../../../competitions/league/screens/LeaguesDiscoveryScreen';
import { LeagueOverviewScreen } from '../../../../competitions/league/screens/LeagueOverviewScreen';
import { LeagueSeasonOverviewScreen } from '../../../../competitions/league/season/screens/LeagueSeasonOverviewScreen';
import { LeagueSeasonFixtureOverviewScreen } from '../../../../competitions/league/season/fixture/screens/LeagueSeasonFixtureOverviewScreen';

export type PlayerUserBottomNavigatorParamList = {
  home: undefined;
  competitions: undefined;
  createFixtureGame: undefined;
  myTeam: undefined;
  myProfile: { isMyProfileView: true } | { isMyProfileView: false; playerUserId: string };
};

export type PlayerUserCompetitionsStackNavigatorParamList = {
  leaguesDiscovery: undefined;
  leagueOverview: { leagueId: string };
  teamOverview: { isMyTeamView: true } | { isMyTeamView: false; teamId: string };
  leagueSeasonOverview: { leagueSeasonId: string };
  leagueSeasonFixtureOverview: { leagueSeasonFixtureId: string };
  playerUserProfileOverview: { isMyProfileView: true } | { isMyProfileView: false; playerUserId: string };
};

export type PlayerUserMyTeamStackNavigatorParamList = {
  teamOverview: { isMyTeamView: true } | { isMyTeamView: false; teamId: string };
  playerUserProfileOverview: { isMyProfileView: true } | { isMyProfileView: false; playerUserId: string };
};

const Tab = createMaterialBottomTabNavigator<PlayerUserBottomNavigatorParamList>();
const CompetitionsStack = createStackNavigator<PlayerUserCompetitionsStackNavigatorParamList>();
const MyTeamStack = createStackNavigator<PlayerUserMyTeamStackNavigatorParamList>();

function CompetitionsStackNavigator() {
  return (
    <CompetitionsStack.Navigator initialRouteName="leaguesDiscovery" screenOptions={{ headerShown: false }}>
      <CompetitionsStack.Screen name="leaguesDiscovery" component={LeaguesDiscoveryScreen} />
      <CompetitionsStack.Screen name="leagueOverview" component={LeagueOverviewScreen} />
      <CompetitionsStack.Screen name="teamOverview" component={TeamOverviewScreen} />
      <CompetitionsStack.Screen name="leagueSeasonOverview" component={LeagueSeasonOverviewScreen} />
      <CompetitionsStack.Screen name="leagueSeasonFixtureOverview" component={LeagueSeasonFixtureOverviewScreen} />
      <CompetitionsStack.Screen name="playerUserProfileOverview" component={PlayerUserProfileOverviewScreen} />
    </CompetitionsStack.Navigator>
  );
}

function MyTeamStackNavigator() {
  return (
    <MyTeamStack.Navigator initialRouteName="teamOverview" screenOptions={{ headerShown: false }}>
      <MyTeamStack.Screen name="teamOverview" component={TeamOverviewScreen} initialParams={{ isMyTeamView: true }} />
      <MyTeamStack.Screen name="playerUserProfileOverview" component={PlayerUserProfileOverviewScreen} />
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
        name="home"
        component={PlayerUserHomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('home', focused, color),
        }}
      />

      <Tab.Screen
        name="competitions"
        component={CompetitionsStackNavigator}
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
        component={MyTeamStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account-group', focused, color),

        }}
      />

      <Tab.Screen
        name="myProfile"
        component={PlayerUserProfileOverviewScreen}
        initialParams={{ isMyProfileView: true }}
        options={{
          tabBarIcon: ({ color, focused }) => getTabIcon('account', focused, color),

        }}
      />
    </Tab.Navigator>
  );
}
