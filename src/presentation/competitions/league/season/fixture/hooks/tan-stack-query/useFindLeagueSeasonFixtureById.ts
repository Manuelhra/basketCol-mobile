import { DomainError } from '@basketcol/domain';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IFindLeagueSeasonFixtureByIdUseCase } from '../../../../../../../basketCol/competitions/league/season/fixture/application/use-cases/ports/IFindLeagueSeasonFixtureByIdUseCase';

export const useFindLeagueSeasonFixtureById = (findLeagueSeasonFixtureByIdUseCase: IFindLeagueSeasonFixtureByIdUseCase, leagueSeasonFixtureId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeasonFixture', leagueSeasonFixtureId],
    queryFn: async () => {
      const result = await findLeagueSeasonFixtureByIdUseCase.execute({ id: leagueSeasonFixtureId });

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

  const leagueSeasonFixture = data === undefined ? null : data?.leagueSeasonFixture.toPrimitives;
  const leagueSeason = data === undefined ? null : data?.leagueSeason.toPrimitives;

  return {
    isLoading,
    requestError,
    data: {
      leagueSeasonFixture,
      leagueSeason,
    },
  };
};
