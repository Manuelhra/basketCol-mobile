import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useRoute,
  RouteProp,
  CommonActions,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { RootState } from '../../../../../shared/store/redux/rootReducer';
import { useFindLeagueSeasonFixtureById } from './tan-stack-query/useFindLeagueSeasonFixtureById';
import { type PlayerUserCompetitionsStackNavigatorParamList } from '../../../../../users/player/navigation/PlayerUserBottomNavigator';
import { findLeagueSeasonFixtureByIdUseCase } from '../../../../../../basketCol/competitions/league/season/fixture/infrastructure/dependency-injection';
import { useFindAllLeagueSeasonFixtureGamesByFixtureId } from '../game/hooks/tan-stack-query/useFindAllLeagueSeasonFixtureGamesByFixtureId';
import { findAllLeagueSeasonFixtureGamesByFixtureIdUseCase } from '../../../../../../basketCol/competitions/league/season/fixture/game/infrastructure/dependency-injection';

export const useLeagueSeasonFixtureOverviewScreenLogic = () => {
  const insets = useSafeAreaInsets();
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const { params, name } = useRoute<RouteProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueSeasonFixtureOverviewScreen'>>();
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leagueSeasonFixtureOverviewScreen'>>();

  const ERROR_MESSAGE = 'Lo sentimos, ha ocurrido un error al cargar la información. Por favor, inténtalo de nuevo más tarde.';

  const {
    isLoading: isLoadingLeagueSeasonFixture,
    requestError: requestErrorLeagueSeasonFixture,
    data: dataLeagueSeasonFixture,
  } = useFindLeagueSeasonFixtureById(findLeagueSeasonFixtureByIdUseCase, params.leagueSeasonFixtureId);

  const {
    isLoading: isLoadingLeagueSeasonFixtureGames,
    requestError: requestErrorLeagueSeasonFixtureGames,
    data: dataLeagueSeasonFixtureGames,
  } = useFindAllLeagueSeasonFixtureGamesByFixtureId(findAllLeagueSeasonFixtureGamesByFixtureIdUseCase, params.leagueSeasonFixtureId);

  const isLoading = isLoadingLeagueSeasonFixture || isLoadingLeagueSeasonFixtureGames;
  const requestError = requestErrorLeagueSeasonFixture || requestErrorLeagueSeasonFixtureGames;

  const getDayNameFn = (dateString: string): string => {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    // Split the date string by '/'
    const [day, month, year] = dateString.split('/');
    // Create date with format YYYY-MM-DD
    const date = new Date(`${year}-${month}-${day}`);

    return days[date.getDay()];
  };

  const getFormattedDateFn = (dateString: string): string => {
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    const [day, month] = dateString.split('/');
    const monthIndex = parseInt(month, 10) - 1;
    const dayNumber = parseInt(day, 10);

    return `${dayNumber} ${months[monthIndex]}`;
  };

  const handleReload = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name,
          params: {
            leagueSeasonFixtureId: params.leagueSeasonFixtureId,
          },
        }],
      }),
    );
  };

  return {
    insets,
    theme,
    themeMode,
    isLoading,
    requestError,
    data: {
      leagueSeasonFixture: dataLeagueSeasonFixture.leagueSeasonFixture,
      leagueSeason: dataLeagueSeasonFixture.leagueSeason,
      leagueSeasonFixtureGames: dataLeagueSeasonFixtureGames?.leagueSeasonFixtureGames,
    },
    errorMessage: ERROR_MESSAGE,
    navigation,
    getDayNameFn,
    getFormattedDateFn,
    handleReload,
  };
};
