import { DomainError } from '@basketcol/domain';
import { useState, useEffect } from 'react';

import { findTeamActivePlayerUseCase } from '../../../basketCol/team/team-player/infrastructure/dependency-injection';
import { useFindTeamActivePlayer } from '../../users/player/hooks/tan-stack-query/useFindTeamActivePlayer';

export function useTeamIdLogic(params: any, authenticatedUserId: string | undefined) {
  const [teamId, setTeamId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const {
    isLoading: isLoadingFindTeamActivePlayer,
    requestError: requestErrorFindTeamActivePlayer,
    teamActivePlayer,
  } = useFindTeamActivePlayer(findTeamActivePlayerUseCase, authenticatedUserId ?? '');

  useEffect(() => {
    if (params.isMyTeamView) {
      setTeamId(teamActivePlayer?.teamInfo.id.value ?? '');
      setIsLoading(isLoadingFindTeamActivePlayer);
      setRequestError(requestErrorFindTeamActivePlayer);
    } else {
      setTeamId(params.teamId);
    }
  }, [params, teamActivePlayer, isLoadingFindTeamActivePlayer, requestErrorFindTeamActivePlayer]);

  return { teamId, isLoading, requestError };
}
