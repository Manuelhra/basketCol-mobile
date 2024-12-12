import { useQuery } from '@tanstack/react-query';
import { DomainError } from '@basketcol/domain';
import { useState } from 'react';

import { IFindAllLeagueTeamsByLeagueIdUseCase } from '../../../../../../basketCol/competitions/league/league-team/application/use-cases/ports/IFindAllLeagueTeamsByLeagueIdUseCase';

export const useFindAllLeagueTeamsByLeagueId = (findAllLeagueTeamsByLeagueIdUseCase: IFindAllLeagueTeamsByLeagueIdUseCase, leagueId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueTeams'],
    queryFn: async () => {
      const result = await findAllLeagueTeamsByLeagueIdUseCase.execute({ leagueId });

      if (result.isLeft) {
        const domainError = result.left();
        const errorList = domainError.type === 'single'
          ? [domainError.error]
          : domainError.errors;
        setRequestError(errorList);
        return null;
      }

      return result.right();
    },
  });

  const leagueTeams = data === undefined ? null : data?.leagueTeams.map((leagueTeam) => leagueTeam.toPrimitives);
  const teamList = data === undefined ? null : data?.teamList.map((team) => team.toPrimitives);
  const leagueInfo = data === undefined ? null : data?.leagueInfo.toPrimitives;

  return {
    isLoading,
    requestError,
    data: {
      leagueTeams,
      teamList,
      leagueInfo,
    },
  };
};
