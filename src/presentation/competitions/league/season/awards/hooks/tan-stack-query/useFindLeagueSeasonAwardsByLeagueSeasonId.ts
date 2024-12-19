import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase } from '../../../../../../../basketCol/competitions/league/season/awards/application/use-cases/ports/IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase';

export const useFindLeagueSeasonAwardsByLeagueSeasonId = (findLeagueSeasonAwardsByLeagueSeasonIdUseCase: IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase, leagueSeasonId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeasonAwards', leagueSeasonId],
    queryFn: async () => {
      const result = await findLeagueSeasonAwardsByLeagueSeasonIdUseCase.execute({ leagueSeasonId });

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

  const leagueSeasonAwards = data === undefined ? null : data?.leagueSeasonAwards.toPrimitives;
  const leagueSeason = data === undefined ? null : data?.leagueSeason.toPrimitives;
  const championTeam = data === undefined ? null : data?.championTeam.toPrimitives;
  const playerUserList = data === undefined ? null : data?.playerUserList.map((playerUser) => playerUser.toPrimitives);

  return {
    isLoading,
    requestError,
    data: {
      leagueSeasonAwards,
      leagueSeason,
      championTeam,
      playerUserList,
    },
  };
};
