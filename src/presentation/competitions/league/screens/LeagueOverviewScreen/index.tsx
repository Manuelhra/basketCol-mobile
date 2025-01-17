import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';

import { getStyles } from './styles';
import { MaterialCommunityIconComponent } from '../../../../shared/components/MaterialCommunityIconComponent';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { TeamCardComponent } from '../../../../team/components/TeamCardComponent';
import { useLeagueOverviewScreenLogic } from '../../hooks/useLeagueOverviewScreenLogic';
import { TeamHttpResponseDTO } from '../../../../../basketCol/team/application/dtos/TeamHttpResponseDTO';
import { LeagueSeasonHttpResponseDTO } from '../../../../../basketCol/competitions/league/season/application/dtos/LeagueSeasonHttpResponseDTO';
import { LeagueOverviewScreenSkeleton } from './LeagueOverviewScreenSkeleton';

export function LeagueOverviewScreen(): React.JSX.Element {
  const {
    theme,
    width,
    navigation,
    isLoading,
    data: {
      league,
      leagueFounder,
      leagueSeasons,
      leagueTeams,
      teamList,
    },
  } = useLeagueOverviewScreenLogic();
  const styles = getStyles(theme, width);
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;

  const renderSeasonCard = ({ item: season }: { item: LeagueSeasonHttpResponseDTO }) => (
    <TouchableOpacity
      key={season.id}
      onPress={() => navigation.navigate('leagueSeasonOverviewScreen', { leagueSeasonId: season.id })}
      style={[styles.seasonCard]}
    >
      <Text style={styles.seasonTitle}>{season.name}</Text>
      <View style={styles.iconWithText}>
        <MaterialCommunityIconComponent
          name="calendar"
          color={theme.colors.textSecondary}
          size={14}
        />
        <Text style={styles.seasonDetails}>
          {` ${season.startDate} - ${season.endDate}`}
        </Text>
      </View>
      <Text style={styles.seasonDetails}>
        Status:
        {' '}
        {season.status}
      </Text>
    </TouchableOpacity>
  );

  const renderTeamCardComponent = ({ item: team }: { item: TeamHttpResponseDTO }) => (
    <TeamCardComponent
      team={team}
      appTheme={theme}
      themeMode={width > 600 ? 'light' : 'dark'}
      isSmall
      onPress={() => navigation.navigate('teamOverviewScreen', { isMyTeamScreen: false, teamId: team.id })}
    />
  );

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  if (isLoading || !league || !leagueFounder || !leagueSeasons || !leagueTeams) {
    return (
      <LeagueOverviewScreenSkeleton
        theme={theme}
        width={width}
        fadeAnim={fadeAnim}
      />
    );
  }

  return (
    <BasketColLayout>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Background Image */}
        <View style={styles.headerContainer}>
          <Image
            source={require('./background-league-overview.jpg')}
            style={styles.headerBackground}
            blurRadius={3}
          />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <MaterialCommunityIconComponent
              name="trophy"
              color={theme.colors.background}
              size={40}
            />
            <Text style={styles.leagueName}>
              {league.name.official}
            </Text>
          </View>
        </View>

        {/* Separator between Header and Founder */}
        <View style={styles.sectionSeparator} />

        {/* Founder Section */}
        <View style={styles.founderContainer}>
          <View style={styles.founderCard}>
            <Image
              source={{ uri: leagueFounder.profileImage.url }}
              alt={leagueFounder.profileImage.alt}
              style={styles.founderImage}
            />
            <View style={styles.founderInfo}>
              <Text style={styles.founderName}>
                {leagueFounder.name.firstName}
                {' '}
                {leagueFounder.name.lastName}
              </Text>
              <View style={styles.founderLocation}>
                <MaterialCommunityIconComponent
                  name="map-marker"
                  color={theme.colors.textSecondary}
                  size={16}
                />
                <Text style={styles.founderLocationText}>
                  {` ${league.location.city.label}, ${league.location.country.label}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seasons Carousel */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitle}>League Seasons</Text>
        </View>
        <View>
          <FlatList
            data={leagueSeasons}
            renderItem={renderSeasonCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seasonScrollContainer}
          />
        </View>

        {/* Teams Carousel */}
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitle}>League Teams</Text>
        </View>
        <View>
          <FlatList
            data={teamList}
            renderItem={renderTeamCardComponent}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teamScrollContainer}
          />
        </View>

      </ScrollView>
    </BasketColLayout>
  );
}
