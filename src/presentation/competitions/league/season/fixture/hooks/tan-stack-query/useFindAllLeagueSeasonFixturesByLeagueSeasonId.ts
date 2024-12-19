import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase } from '../../../../../../../basketCol/competitions/league/season/fixture/application/use-cases/ports/IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase';

export const useFindAllLeagueSeasonFixturesByLeagueSeasonId = (findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase: IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase, leagueSeasonId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeasonFixtures'],
    queryFn: async () => {
      const result = await findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase.execute({ leagueSeasonId });

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

  const leagueSeasonFixtures = data === undefined ? null : data?.leagueSeasonFixtures.map((leagueSeasonFixture) => leagueSeasonFixture.toPrimitives);
  const leagueSeason = data === undefined ? null : data?.leagueSeason.toPrimitives;

  return {
    isLoading,
    requestError,
    data: {
      leagueSeasonFixtures,
      leagueSeason,
    },
  };
};
