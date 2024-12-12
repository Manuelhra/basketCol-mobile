import { DomainError } from '@basketcol/domain';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IFindLeagueByIdUseCase } from '../../../../../basketCol/competitions/league/application/use-cases/ports/IFindLeagueByIdUseCase';

export const useFindLeagueById = (findLeagueByIdUseCase: IFindLeagueByIdUseCase, leagueId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['league'],
    queryFn: async () => {
      const result = await findLeagueByIdUseCase.execute({ id: leagueId });

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

  const league = data === undefined ? null : data?.league.toPrimitives;
  const leagueFounderUser = data === undefined ? null : data?.leagueFounderUser.toPrimitives;

  return {
    isLoading,
    requestError,
    data: {
      league,
      leagueFounderUser,
    },
  };
};
