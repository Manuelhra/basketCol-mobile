import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { IFindLeagueSeasonByIdUseCase } from '../../../../../../basketCol/competitions/league/season/application/use-cases/ports/IFindLeagueSeasonByIdUseCase';

export const useFindLeagueSeasonById = (findLeagueSeasonByIdUseCase: IFindLeagueSeasonByIdUseCase, leagueSeasonId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeason', leagueSeasonId],
    queryFn: async () => {
      const result = await findLeagueSeasonByIdUseCase.execute({ id: leagueSeasonId });

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

  const leagueSeason = data === undefined ? null : data?.leagueSeason.toPrimitives;
  const league = data === undefined ? null : data?.league.toPrimitives;

  return {
    isLoading,
    requestError,
    data: {
      leagueSeason,
      league,
    },
  };
};

// TODO: Validar que todos los datos donde se haga consulta por id, se guarden en cache queryKey
