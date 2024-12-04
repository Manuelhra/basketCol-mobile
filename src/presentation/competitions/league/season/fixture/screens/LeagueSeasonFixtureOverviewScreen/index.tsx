import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../../../../../shared/store/redux/rootReducer';
import { LinearGradientComponent } from './LinearGradientComponent';
import { MaterialCommunityIconComponent } from '../../../../../../shared/components/MaterialCommunityIconComponent';

export function LeagueSeasonFixtureOverviewScreen(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme, themeMode);

  const dummyMatches = [
    {
      id: '1',
      homeTeam: {
        name: 'Real Madrid',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      awayTeam: {
        name: 'Barcelona',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      status: 'Próximamente',
      time: '20:00',
      league: 'La Liga',
    },
    {
      id: '2',
      homeTeam: {
        name: 'Manchester United',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      awayTeam: {
        name: 'Liverpool',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      status: 'En curso',
      time: '15:30',
      league: 'Premier League',
    },
    {
      id: '3',
      homeTeam: {
        name: 'Manchester United',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      awayTeam: {
        name: 'Liverpool',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      status: 'En curso',
      time: '15:30',
      league: 'Premier League',
    },
    {
      id: '4',
      homeTeam: {
        name: 'Manchester United',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      awayTeam: {
        name: 'Liverpool',
        logo: 'https://basketcol-dev-logo.s3.us-east-1.amazonaws.com/team/1732296201563-8c78944a.webp',
      },
      status: 'En curso',
      time: '15:30',
      league: 'Premier League',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <LinearGradientComponent
          colors={[
            theme.colors.primary,
            theme.colors.secondary,
            theme.colors.quaternary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContentContainer}>
            <TouchableOpacity style={styles.backButton}>
              <MaterialCommunityIconComponent
                name="arrow-left"
                size={24}
                color={theme.colors.background}
              />
            </TouchableOpacity>

            <View style={styles.dateInfoContainer}>
              <Text style={styles.dayText}>Miércoles</Text>
              <Text style={styles.dateText}>21 Nov</Text>
              <View style={styles.leagueTagContainer}>
                <Text style={styles.leagueTag}>Champions League</Text>
              </View>
            </View>

            <View style={styles.headerMetaContainer}>
              <View style={styles.matchCountBadge}>
                <Text style={styles.matchCountText}>6 Partidos</Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIconComponent
                  name="filter-variant"
                  size={24}
                  color={theme.colors.background}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradientComponent>

        <View style={styles.headerCurve} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {dummyMatches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={styles.matchCard}
          >
            <View style={styles.matchCardContent}>
              <View style={styles.teamContainer}>
                <Image
                  source={{ uri: match.homeTeam.logo }}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{match.homeTeam.name}</Text>
              </View>

              <View style={styles.matchDetailsContainer}>
                <Text style={styles.vsText}>VS</Text>
                <Text style={styles.matchStatus}>{match.status}</Text>
                <Text style={styles.matchTime}>{match.time}</Text>
              </View>

              <View style={styles.teamContainer}>
                <Image
                  source={{ uri: match.awayTeam.logo }}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{match.awayTeam.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
