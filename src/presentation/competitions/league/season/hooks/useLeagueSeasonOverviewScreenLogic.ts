import { useSelector } from 'react-redux';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useState, useRef, useMemo } from 'react';
import { FlatList, Dimensions } from 'react-native';

import { RootState } from '../../../../shared/store/redux/rootReducer';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../../users/player/navigation/PlayerUserBottomNavigator';
import { useFindLeagueSeasonById } from './tan-stack-query/useFindLeagueSeasonById';
import { findLeagueSeasonByIdUseCase } from '../../../../../basketCol/competitions/league/season/infrastructure/dependency-injection';
import { useFindAllLeagueSeasonFixturesByLeagueSeasonId } from '../fixture/hooks/tan-stack-query/useFindAllLeagueSeasonFixturesByLeagueSeasonId';
import { findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase } from '../../../../../basketCol/competitions/league/season/fixture/infrastructure/dependency-injection';
import { useFindLeagueSeasonAwardsByLeagueSeasonId } from '../awards/hooks/tan-stack-query/useFindLeagueSeasonAwardsByLeagueSeasonId';
import { findLeagueSeasonAwardsByLeagueSeasonIdUseCase } from '../../../../../basketCol/competitions/league/season/awards/infrastructure/dependency-injection';
import { PlayerUserHttpResponseDTO } from '../../../../../basketCol/users/player/application/dtos/PlayerUserHttpResponseDTO';

enum PlayerAwardType {
  MVP = 'MVP',
  Assist = 'Assist',
  DefensiveRebound = 'Defensive Rebound',
  OffensiveRebound = 'Offensive Rebound',
  FreeTrow = 'Free Throw',
  ThreePoint = 'Three Point',
  TwoPoint = 'Two Point',
  BestPlayer = 'Best Player',
}

export const useLeagueSeasonOverviewScreenLogic = () => {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const fixturesRef = useRef<FlatList>(null);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const mvpsRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueSeasonOverviewScreen'>>();
  const { params } = useRoute<RouteProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueSeasonOverviewScreen'>>();

  const {
    isLoading: isLoadingLeagueSeason,
    requestError: requestErrorLeagueSeason,
    data: dataLeagueSeason,
  } = useFindLeagueSeasonById(findLeagueSeasonByIdUseCase, params.leagueSeasonId);

  const {
    isLoading: isLoadingLeagueSeasonFixtures,
    requestError: requestErrorLeagueSeasonFixtures,
    data: dataLeagueSeasonFixtures,
  } = useFindAllLeagueSeasonFixturesByLeagueSeasonId(findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase, params.leagueSeasonId);

  const {
    isLoading: isLoadingLeagueSeasonAwards,
    requestError: requestErrorLeagueSeasonAwards,
    data: dataLeagueSeasonAwards,
  } = useFindLeagueSeasonAwardsByLeagueSeasonId(findLeagueSeasonAwardsByLeagueSeasonIdUseCase, params.leagueSeasonId);

  // Memoized unique players list
  const uniquePlayerUserList = useMemo(() => {
    if (!dataLeagueSeasonAwards?.playerUserList) return [];

    // Use a Set to track unique player IDs
    const uniquePlayerIds = new Set<string>();

    // Filter out duplicate players based on their ID
    return dataLeagueSeasonAwards.playerUserList.filter((player: PlayerUserHttpResponseDTO) => {
      // If this ID has been seen before, filter it out
      if (uniquePlayerIds.has(player.id)) {
        return false;
      }

      // Add the ID to the set
      uniquePlayerIds.add(player.id);
      return true;
    });
  }, [dataLeagueSeasonAwards?.playerUserList]);

  const formatDateFn = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const getPlayerAwardPositionFn = (playerUserId: string): PlayerAwardType => {
    const awards = dataLeagueSeasonAwards.leagueSeasonAwards;

    if (playerUserId === awards?.mostValuablePlayerId) return PlayerAwardType.MVP;
    if (playerUserId === awards?.bestAssistProviderId) return PlayerAwardType.Assist;
    if (playerUserId === awards?.bestDefensiveRebounderId) return PlayerAwardType.DefensiveRebound;
    if (playerUserId === awards?.bestOffensiveRebounderId) return PlayerAwardType.OffensiveRebound;
    if (playerUserId === awards?.bestFreeThrowShooterId) return PlayerAwardType.FreeTrow;
    if (playerUserId === awards?.bestThreePointShooterId) return PlayerAwardType.ThreePoint;
    if (playerUserId === awards?.bestTwoPointShooterId) return PlayerAwardType.TwoPoint;

    return PlayerAwardType.BestPlayer;
  };

  const isLoading = isLoadingLeagueSeason
  || isLoadingLeagueSeasonFixtures
  || isLoadingLeagueSeasonAwards;

  const requestError = requestErrorLeagueSeason
  || requestErrorLeagueSeasonFixtures
  || requestErrorLeagueSeasonAwards;

  return {
    isLoading,
    requestError,
    data: {
      leagueSeason: dataLeagueSeason.leagueSeason,
      league: dataLeagueSeason.league,
      leagueSeasonFixtures: dataLeagueSeasonFixtures.leagueSeasonFixtures,
      leagueSeasonAwards: dataLeagueSeasonAwards.leagueSeasonAwards,
      championTeam: dataLeagueSeasonAwards.championTeam,
      playerUserList: uniquePlayerUserList,
    },
    theme,
    themeMode,
    isCalendarVisible,
    fixturesRef,
    SCREEN_WIDTH,
    mvpsRef,
    navigation,
    setIsCalendarVisible,
    formatDateFn,
    getPlayerAwardPositionFn,
  };
};
