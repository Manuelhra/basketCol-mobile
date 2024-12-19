import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { getStyles } from './styles';
import { BasketColLayout } from '../../../../../shared/layout/BasketColLayout';
import { SlideModalComponent } from '../../../../../shared/components/SlideModalComponent';
import { PlayerUserCardComponent } from '../../../../../users/player/components/PlayerUserCardComponent';
import { PlayerUserHttpResponseDTO } from '../../../../../../basketCol/users/player/application/dtos/PlayerUserHttpResponseDTO';
import { EnhancedCalendarComponent } from '../../../../../shared/components/EnhancedCalendarComponent';
import { useLeagueSeasonOverviewScreenLogic } from '../../hooks/useLeagueSeasonOverviewScreenLogic';
import { LeagueSeasonFixtureHttpResponseDTO } from '../../../../../../basketCol/competitions/league/season/fixture/application/dtos/LeagueSeasonFixtureHttpResponseDTO';
import { LeagueSeasonOverviewScreenSkeleton } from './LeagueSeasonOverviewScreenSkeleton';

export function LeagueSeasonOverviewScreen(): React.JSX.Element {
  const {
    isLoading,
    theme,
    themeMode,
    isCalendarVisible,
    SCREEN_WIDTH,
    fixturesRef,
    mvpsRef,
    navigation,
    data: {
      league,
      leagueSeason,
      leagueSeasonAwards,
      leagueSeasonFixtures,
      playerUserList,
    },
    setIsCalendarVisible,
    formatDateFn,
    getPlayerAwardPositionFn,
  } = useLeagueSeasonOverviewScreenLogic();
  const fadeAnim = React.useRef(new Animated.Value(0.5)).current;
  const styles = getStyles(theme);

  const renderFixtureCard = ({ item }: { item: LeagueSeasonFixtureHttpResponseDTO }) => (
    <TouchableOpacity
      style={[styles.fixtureCard, { width: SCREEN_WIDTH * 0.7 }]}
      onPress={() => navigation.navigate('leagueSeasonFixtureOverview', { leagueSeasonFixtureId: item.id })}
    >
      <View
        style={[
          styles.fixtureCardContent,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={styles.fixtureCardTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.fixtureCardDate}>
          {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMVPCard = ({ item }: { item: PlayerUserHttpResponseDTO }) => (
    <View style={styles.mvpCard}>
      <PlayerUserCardComponent
        playerUserDto={item}
        appTheme={theme}
        position={getPlayerAwardPositionFn(item.id)}
        teamLogo={null}
        themeMode={themeMode}
        isSmall
        showFullPosition
        onPress={() => navigation.navigate('playerUserProfileOverview', {
          isMyProfileView: false,
          playerUserId: item.id,
        })}
      />
    </View>
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

  if (isLoading || !leagueSeason || !leagueSeasonFixtures || !league) {
    return (
      <LeagueSeasonOverviewScreenSkeleton
        theme={theme}
        fadeAnim={fadeAnim}
        themeMode={themeMode}
      />
    );
  }

  return (
    <BasketColLayout
      rightIcons={[
        {
          icon: 'calendar',
          action: () => setIsCalendarVisible(true),
        },
      ]}
    >
      <SlideModalComponent
        isVisible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
      >
        <EnhancedCalendarComponent
          enhancedMarkedDates={leagueSeasonFixtures.reduce((acc, fixture) => {
            // eslint-disable-next-line no-param-reassign
            acc[formatDateFn(fixture.date)] = {
              marked: true,
              dotColor: 'red',
              description: fixture.name || 'Fixture',
            };
            return acc;
          }, {} as Record<string, { marked: boolean; dotColor: string; description: string }>)}
          onDayPress={(day) => {
            const matchingFixture = leagueSeasonFixtures.find(
              (fixture) => formatDateFn(fixture.date) === day.dateString,
            );

            if (matchingFixture) {
              navigation.navigate('leagueSeasonFixtureOverview', {
                leagueSeasonFixtureId: matchingFixture.id,
              });
              setIsCalendarVisible(false);
            }
          }}
        />
      </SlideModalComponent>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={require('./background-league-season-screen.jpg')}
            style={styles.headerBackground}
          />
          <View style={styles.headerOverlay} />

          <Text style={styles.leagueName}>{league.name.official}</Text>
          <View style={styles.seasonDetailsContainer}>
            <Text style={styles.seasonDetails}>{leagueSeason.name}</Text>
            <View style={styles.seasonStatusBadge}>
              <Text style={styles.seasonStatusText}>{leagueSeason.status}</Text>
            </View>
          </View>
        </View>

        {/* Fixtures Carousel */}
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Upcoming Fixtures</Text>
          <FlatList
            ref={fixturesRef}
            data={leagueSeasonFixtures}
            renderItem={renderFixtureCard}
            keyExtractor={(item) => `fixture-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH * 0.7 + 10}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.medium,
            }}
          />
        </View>

        {/* MVPs Carousel - Only show if leagueSeasonAwards exists */}
        {leagueSeasonAwards && (
          <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitle}>Season MVPs</Text>
            <FlatList
              ref={mvpsRef}
              data={playerUserList}
              renderItem={renderMVPCard}
              keyExtractor={(item, index) => `mvp-${index}-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SCREEN_WIDTH * 0.6 + 10}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: theme.spacing.medium,
              }}
            />
          </View>
        )}
      </ScrollView>
    </BasketColLayout>
  );
}
