import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { getStyles } from './styles';
import { RootState } from '../../../../shared/store/redux/rootReducer';
import { MaterialCommunityIconComponent } from '../../../../shared/components/MaterialCommunityIconComponent';
import { dummyLeagueData } from './dummy-data';
import { BasketColLayout } from '../../../../shared/layout/BasketColLayout';
import { TeamCardComponent } from '../../../../team/components/TeamCardComponent';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../../users/player/navigation/PlayerUserBottomNavigator';

interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  courtIdList: string[];
}

export function LeagueOverviewScreen(): React.JSX.Element {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueOverview'>>();
  const styles = getStyles(theme, width);

  // Animation values
  const headerOpacity = new Animated.Value(0);
  const founderOpacity = new Animated.Value(0);
  const seasonsOpacity = new Animated.Value(0);
  const teamsOpacity = new Animated.Value(0);

  // Trigger animations
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(founderOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(seasonsOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(teamsOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderSeasonCard = ({ item: season }: { item: Season }) => (
    <TouchableOpacity
      key={season.id}
      onPress={() => navigation.navigate('leagueSeasonOverview')}
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
          {` ${new Date(season.startDate).getFullYear()} - ${new Date(season.endDate).getFullYear()}`}
        </Text>
      </View>
      <Text style={styles.seasonDetails}>
        Status:
        {' '}
        {season.status}
      </Text>
    </TouchableOpacity>
  );

  const renderTeamCardComponent = ({ item: team }: { item: any }) => (
    <TeamCardComponent
      team={team}
      appTheme={theme}
      themeMode={width > 600 ? 'light' : 'dark'}
      isSmall
      onPress={() => navigation.navigate('teamOverview', { isMyTeamView: false, teamId: team.id })}
    />
  );

  return (
    <BasketColLayout
      rightIcons={[
        { icon: 'clipboard-text', action: () => {} },
      ]}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Background Image */}
        <Animated.View
          style={[styles.headerContainer, { opacity: headerOpacity }]}
        >
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
              {dummyLeagueData.league.name.official}
            </Text>
          </View>
        </Animated.View>

        {/* Separator between Header and Founder */}
        <View style={styles.sectionSeparator} />

        {/* Founder Section */}
        <Animated.View
          style={[styles.founderContainer, { opacity: founderOpacity }]}
        >
          <View style={styles.founderCard}>
            <Image
              source={{ uri: dummyLeagueData.leagueFounder.profileImage.url }}
              alt={dummyLeagueData.leagueFounder.profileImage.alt}
              style={styles.founderImage}
            />
            <View style={styles.founderInfo}>
              <Text style={styles.founderName}>
                {dummyLeagueData.leagueFounder.name.firstName}
                {' '}
                {dummyLeagueData.leagueFounder.name.lastName}
              </Text>
              <View style={styles.founderLocation}>
                <MaterialCommunityIconComponent
                  name="map-marker"
                  color={theme.colors.textSecondary}
                  size={16}
                />
                <Text style={styles.founderLocationText}>
                  {` ${dummyLeagueData.league.location.city}, ${dummyLeagueData.league.location.country}`}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Seasons Carousel */}
        <Animated.View
          style={[
            styles.sectionTitle,
            { opacity: seasonsOpacity },
          ]}
        >
          <Text style={styles.sectionTitle}>League Seasons</Text>
        </Animated.View>
        <Animated.View style={{ opacity: seasonsOpacity }}>
          <FlatList
            data={dummyLeagueData.seasons}
            renderItem={renderSeasonCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seasonScrollContainer}
          />
        </Animated.View>

        {/* Teams Carousel */}
        <Animated.View
          style={[
            styles.sectionTitle,
            { opacity: teamsOpacity },
          ]}
        >
          <Text style={styles.sectionTitle}>League Teams</Text>
        </Animated.View>
        <Animated.View style={{ opacity: teamsOpacity }}>
          <FlatList
            data={dummyLeagueData.teams}
            renderItem={renderTeamCardComponent}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teamScrollContainer}
          />
        </Animated.View>

      </ScrollView>
    </BasketColLayout>
  );
}
