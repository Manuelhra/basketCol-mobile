import {
  useNavigation,
  NavigationProp,
  CommonActions,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { useCallback } from 'react';
import { searchAllLeaguesUseCase } from '../../../../basketCol/competitions/league/infrastructure/dependency-injection';
import { RootState } from '../../../shared/store/redux/rootReducer';
import {
  type PlayerUserBottomNavigatorParamList,
  type PlayerUserCompetitionsStackNavigatorParamList,
} from '../../../users/player/navigation/PlayerUserBottomNavigator';
import { useSearchAllLeagues } from './tan-stack-query/useSearchAllLeagues';

export const useLeaguesDiscoveryScreenLogic = () => {
  const { theme, themeMode } = useSelector((state: RootState) => state.theme);
  const navigation = useNavigation<NavigationProp<PlayerUserCompetitionsStackNavigatorParamList, 'leaguesDiscoveryScreen'>>();
  const { name } = useRoute<RouteProp<PlayerUserBottomNavigatorParamList, 'competitionsScreen'>>();

  const {
    data,
    isLoading,
    requestError,
  } = useSearchAllLeagues(searchAllLeaguesUseCase);

  const handleLeaguePress = (leagueId: string) => {
    navigation.navigate('leagueOverviewScreen', { leagueId });
  };

  const handleReload = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name,
        }],
      }),
    );
  }, [navigation]);

  return {
    isLoading,
    requestError,
    data,
    theme,
    themeMode,
    handleLeaguePress,
    handleReload,
  };
};
