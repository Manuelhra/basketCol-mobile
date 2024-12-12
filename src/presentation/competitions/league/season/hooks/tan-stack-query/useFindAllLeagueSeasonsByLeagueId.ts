import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { IFindAllLeagueSeasonsByLeagueIdUseCase } from '../../../../../../basketCol/competitions/league/season/application/use-cases/ports/IFindAllLeagueSeasonsByLeagueIdUseCase';

export const useFindAllLeagueSeasonsByLeagueId = (findAllLeagueSeasonsByLeagueIdUseCase: IFindAllLeagueSeasonsByLeagueIdUseCase, leagueId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeasons'],
    queryFn: async () => {
      const result = await findAllLeagueSeasonsByLeagueIdUseCase.execute({ leagueId });

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

  const leagueSeasons = data === undefined ? null : data?.map((leagueSeason) => leagueSeason.toPrimitives);

  return {
    isLoading,
    requestError,
    data: {
      leagueSeasons,
    },
  };
};
