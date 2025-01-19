import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootState } from '../../../shared/store/redux/rootReducer';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../users/player/navigation/PlayerUserBottomNavigator';
import { useFindLeagueById } from './tan-stack-query/useFindLeagueById';
import { findLeagueByIdUseCase } from '../../../../basketCol/competitions/league/infrastructure/dependency-injection';
import { useFindAllLeagueSeasonsByLeagueId } from '../season/hooks/tan-stack-query/useFindAllLeagueSeasonsByLeagueId';
import { findAllLeagueSeasonsByLeagueIdUseCase } from '../../../../basketCol/competitions/league/season/infrastructure/dependency-injection';
import { useFindAllLeagueTeamsByLeagueId } from '../league-team/hooks/tan-stack-query/useFindAllLeagueTeamsByLeagueId';
import { findAllLeagueTeamsByLeagueIdUseCase } from '../../../../basketCol/competitions/league/league-team/infrastructure/dependency-injection';

export const useLeagueOverviewScreenLogic = () => {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueOverviewScreen'>>();
  const { params } = useRoute<RouteProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueOverviewScreen'>>();

  const {
    isLoading: isLoadingLeague,
    requestError: requestErrorLeague,
    data: dataLeague,
  } = useFindLeagueById(findLeagueByIdUseCase, params.leagueId);

  const {
    isLoading: isLoadingLeagueSeasons,
    requestError: requestErrorLeagueSeasons,
    data: dataSeasons,
  } = useFindAllLeagueSeasonsByLeagueId(findAllLeagueSeasonsByLeagueIdUseCase, params.leagueId);

  const {
    isLoading: isLoadingLeagueTeams,
    requestError: requestErrorLeagueTeams,
    data: dataLeagueTeams,
  } = useFindAllLeagueTeamsByLeagueId(findAllLeagueTeamsByLeagueIdUseCase, params.leagueId);

  const isLoading = isLoadingLeague || isLoadingLeagueSeasons || isLoadingLeagueTeams;
  const requestError = requestErrorLeague || requestErrorLeagueSeasons || requestErrorLeagueTeams;

  return {
    isLoading,
    requestError,
    data: {
      league: dataLeague.league,
      leagueFounder: dataLeague.leagueFounderUser,
      leagueSeasons: dataSeasons.leagueSeasons,
      leagueTeams: dataLeagueTeams.leagueTeams,
      teamList: dataLeagueTeams.teamList,
    },
    theme,
    themeMode,
    width,
    navigation,
  };
};
