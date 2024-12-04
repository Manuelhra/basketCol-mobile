import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { getStyles } from './styles';
import { RootState } from '../../../../../shared/store/redux/rootReducer';
import { dummyLeagueSeasonData } from './dummy-data';
import { BasketColLayout } from '../../../../../shared/layout/BasketColLayout';
import { SlideModalComponent } from '../../../../../shared/components/SlideModalComponent';
import { PlayerUserCardComponent } from '../../../../../users/player/components/PlayerUserCardComponent';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../../../users/player/navigation/PlayerUserBottomNavigator';
import { PlayerUserHttpResponseDTO } from '../../../../../../basketCol/users/player/application/dtos/PlayerUserHttpResponseDTO';
import { EnhancedCalendarComponent } from '../../../../../shared/components/EnhancedCalendarComponent';

export function LeagueSeasonOverviewScreen(): React.JSX.Element {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const fixturesRef = useRef<FlatList>(null);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const styles = getStyles(theme);
  const mvpsRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueSeasonOverview'>>();

  const renderFixtureCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.fixtureCard, { width: SCREEN_WIDTH * 0.7 }]}
      onPress={() => navigation.navigate('leagueSeasonFixtureOverview')}
    >
      <View
        style={[
          styles.fixtureCardContent,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={styles.fixtureCardTitle} numberOfLines={2}>
          Jornada 1
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
        position="Forward"
        teamLogo={null}
        themeMode={themeMode}
        isSmall
        showFullPosition
        onPress={() => navigation.navigate('playerUserProfileOverview', { isMyProfileView: false, playerUserId: '' })}
      />
    </View>
  );

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
          enhancedMarkedDates={dummyLeagueSeasonData.fixtures}
          onDayPress={(day) => {
            const fixture: string[] = Object.keys(dummyLeagueSeasonData.fixtures);
            if (fixture.includes(day.dateString)) {
              navigation.navigate('leagueSeasonFixtureOverview');
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
          {/* Imagen de fondo */}
          <Image
            source={require('./background-league-season-screen.jpg')}
            style={styles.headerBackground}
          />
          {/* Overlay semitransparente */}
          <View style={styles.headerOverlay} />

          {/* Contenido del header */}
          <Text style={styles.leagueName}>Nombre de la Liga</Text>
          <View style={styles.seasonDetailsContainer}>
            <Text style={styles.seasonDetails}>Detalles de la Temporada</Text>
            <View style={styles.seasonStatusBadge}>
              <Text style={styles.seasonStatusText}>Activa</Text>
            </View>
          </View>
        </View>

        {/* Fixtures Carousel */}
        {/* Fixtures Carousel */}
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Upcoming Fixtures</Text>
          <FlatList
            ref={fixturesRef}
            data={dummyLeagueSeasonData.fixtures}
            renderItem={renderFixtureCard}
            keyExtractor={(item, index) => `fixture-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH * 0.7 + 10} // Width of card + margin
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.medium,
            }}
          />
        </View>

        {/* MVPs Carousel */}
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Season MVPs</Text>
          <FlatList
            ref={mvpsRef}
            data={dummyLeagueSeasonData.players}
            renderItem={renderMVPCard}
            keyExtractor={(item, index) => `mvp-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH * 0.6 + 10} // Width of card + margin
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.medium,
            }}
          />
        </View>
      </ScrollView>
    </BasketColLayout>
  );
}
