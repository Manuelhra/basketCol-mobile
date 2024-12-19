import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { getStyles } from './styles';
import { LinearGradientComponent } from './LinearGradientComponent';
import { MaterialCommunityIconComponent } from '../../../../../../shared/components/MaterialCommunityIconComponent';
import { BasketColLayout } from '../../../../../../shared/layout/BasketColLayout';
import { useLeagueSeasonFixtureOverviewScreenLogic } from '../../hooks/useLeagueSeasonFixtureOverviewScreenLogic';
import { LeagueSeasonFixtureOverviewScreenSkeleton } from './LeagueSeasonFixtureOverviewScreenSkeleton';
import { ErrorModalComponent } from '../../../../../../shared/components/ErrorModalComponent';

export function LeagueSeasonFixtureOverviewScreen(): React.JSX.Element {
  const {
    isLoading,
    requestError,
    data,
    insets,
    theme,
    themeMode,
    errorMessage,
    navigation,
    getDayNameFn,
    getFormattedDateFn,
    handleReload,
  } = useLeagueSeasonFixtureOverviewScreenLogic();
  const styles = getStyles(theme, themeMode);

  if (isLoading || !data || !data.leagueSeason || !data.leagueSeasonFixture || !data.leagueSeasonFixtureGames) {
    return (
      <LeagueSeasonFixtureOverviewScreenSkeleton />
    );
  }

  // Error handling
  if (requestError) {
    return (
      <ScrollView style={styles.container}>
        <ErrorModalComponent
          isVisible
          errorMessage={errorMessage}
          showCloseIcon={false}
          secondaryActionLabel="Reintentar"
          secondaryActionHandler={handleReload}
        />
        <LeagueSeasonFixtureOverviewScreenSkeleton />
      </ScrollView>
    );
  }

  const dayName = getDayNameFn(data.leagueSeasonFixture.date);
  const formattedDate = getFormattedDateFn(data.leagueSeasonFixture.date);

  return (
    <BasketColLayout>
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
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIconComponent
                  name="arrow-left"
                  size={24}
                  color={theme.colors.background}
                />
              </TouchableOpacity>

              <View style={styles.dateInfoContainer}>
                <Text style={styles.dayText}>{dayName}</Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <View style={styles.leagueTagContainer}>
                  <Text style={styles.leagueTag}>{data.leagueSeason.name}</Text>
                </View>
              </View>

              <View style={styles.headerMetaContainer}>
                <View style={styles.matchCountBadge}>
                  <Text style={styles.matchCountText}>
                    {data.leagueSeasonFixtureGames.length}
                    {' '}
                    Partidos
                  </Text>
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
          {data.leagueSeasonFixtureGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.matchCard}
            >
              <View style={styles.matchCardContent}>
                <View style={styles.teamContainer}>
                  <Image
                    source={{ uri: game.homeTeam?.logo.url }}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.teamName}>{game.homeTeam?.officialName || 'Equipo Local'}</Text>
                </View>

                <View style={styles.matchDetailsContainer}>
                  <Text style={styles.vsText}>VS</Text>
                  <Text style={styles.matchStatus}>{game.gameStatus}</Text>
                  <Text style={styles.matchTime}>{game.startTime}</Text>
                </View>

                <View style={styles.teamContainer}>
                  <Image
                    source={{ uri: game.awayTeam?.logo.url }}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.teamName}>{game.awayTeam?.officialName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </BasketColLayout>
  );
}
