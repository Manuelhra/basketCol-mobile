import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Nullable,
  PlayerUser,
  Team,
  TeamPlayer,
} from '@basketcol/domain';

import { findTeamByIdUseCase } from '../../../basketCol/team/infrastructure/dependency-injection';
import { findAllTeamActivePlayersUseCase, findTeamActivePlayerUseCase } from '../../../basketCol/team/team-player/infrastructure/dependency-injection';
import { RootState } from '../../shared/store/redux/rootReducer';
import { type PlayerUserMyTeamStackNavigatorParamList } from '../../users/player/navigation/PlayerUserBottomNavigator';
import { useFindTeamById } from './tan-stack-query/useFindTeamById';
import { useFindAllTeamActivePlayers } from './tan-stack-query/useFindAllTeamActivePlayers';
import { TeamPlayerHttpResponseDTO } from '../../../basketCol/team/team-player/application/dtos/TeamPlayerHttpResponseDTO';
import { useFindTeamActivePlayer } from '../../users/player/hooks/tan-stack-query/useFindTeamActivePlayer';

const ERROR_MESSAGE = 'Lo sentimos, ha ocurrido un error al cargar la información. Por favor, inténtalo de nuevo más tarde.';

export const useTeamOverviewScreenLogic = () => {
  const { params, name } = useRoute<RouteProp<PlayerUserMyTeamStackNavigatorParamList, 'teamOverview'>>();
  const { authenticatedUser } = useSelector((state: RootState) => state.authentication);
  const navigation = useNavigation<NavigationProp<PlayerUserMyTeamStackNavigatorParamList, 'teamOverview'>>();
  // Only fetch active team if it's my team view
  let teamActivePlayer;
  let isLoadingFindTeamActivePlayer;
  let requestErrorFindTeamActivePlayer;

  if (params.isMyTeamView) {
    ({ teamActivePlayer, isLoading: isLoadingFindTeamActivePlayer, requestError: requestErrorFindTeamActivePlayer } = useFindTeamActivePlayer(
      findTeamActivePlayerUseCase,
      authenticatedUser?.id ?? '',
    ));
  } else {
    teamActivePlayer = null;
    isLoadingFindTeamActivePlayer = false;
    requestErrorFindTeamActivePlayer = null;
  }
  // Determine teamId with fallback and memoization
  const teamId = useMemo(() => {
    if (params.isMyTeamView) {
      // Prioritize teamActivePlayer if available
      return teamActivePlayer?.teamInfo.id.value || '';
    }
    // Use params teamId for non-my team view
    return params.teamId;
  }, [params.isMyTeamView, params, teamActivePlayer]);

  const handleReload = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{
          name,
          params: params.isMyTeamView
            ? { isMyTeamView: true }
            : { isMyTeamView: false, teamId: params.teamId },
        }],
      }),
    );
  };

  const {
    isLoading: isLoadingTeam,
    requestError: teamError,
    findTeamByIdUseCaseResponse,
  } = useFindTeamById(findTeamByIdUseCase, teamId, { enabled: !!teamId });

  const {
    isLoading: isLoadingActivePlayers,
    requestError: activePlayersError,
    teamActivePlayers,
  } = useFindAllTeamActivePlayers(findAllTeamActivePlayersUseCase, teamId, { enabled: !!teamId });

  // Combine loading states
  const isLoading = isLoadingActivePlayers || isLoadingTeam || isLoadingFindTeamActivePlayer;

  // Combine request errors
  const requestError = activePlayersError || teamError || requestErrorFindTeamActivePlayer;

  const mapTeamPlayerWithPlayerUser = (
    teamPlayer: TeamPlayer,
    team: Team,
    playerUserList: PlayerUser[],
  ): TeamPlayerHttpResponseDTO | null => {
    const playerUserFound: Nullable<PlayerUser> = playerUserList.find(
      (playerUser) => playerUser.id.value === teamPlayer.toPrimitives.playerUserId,
    );

    if (!playerUserFound) return null;

    return {
      ...teamPlayer.toPrimitives,
      team: team.toPrimitives,
      playerUser: playerUserFound.toPrimitives,
    };
  };

  const teamPlayerUserList: TeamPlayerHttpResponseDTO[] = teamActivePlayers
    ? teamActivePlayers.teamPlayers
      .map((teamPlayer) => mapTeamPlayerWithPlayerUser(teamPlayer, teamActivePlayers.teamInfo, teamActivePlayers.playerUserList))
      .filter((teamPlayer): teamPlayer is TeamPlayerHttpResponseDTO => teamPlayer !== null)
    : [];

  const renderPlayerCard = (teamPlayerHttpResponseDTO: TeamPlayerHttpResponseDTO) => {
    const isCurrentUser = teamPlayerHttpResponseDTO.playerUser.id === authenticatedUser?.id;

    return {
      teamPlayerHttpResponseDTO,
      isCurrentUser,
      onPress: () => navigation.navigate('playerUserProfileOverview', { isMyProfileView: false, playerUserId: teamPlayerHttpResponseDTO.playerUser.id }),
    };
  };

  return {
    team: findTeamByIdUseCaseResponse?.team?.toPrimitives,
    teamAllTimeStats: findTeamByIdUseCaseResponse?.teamAllTimeStats?.toPrimitives,
    teamPlayerUserList,
    isLoading,
    requestError,
    errorMessage: ERROR_MESSAGE,
    renderPlayerCard,
    handleReload,
  };
};
