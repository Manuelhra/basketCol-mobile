import { useState } from 'react';
import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';

import { ISearchAllLeaguesUseCase } from '../../../../../basketCol/competitions/league/application/use-cases/ports/ISearchAllLeaguesUseCase';

export const useSearchAllLeagues = (searchAllLeaguesUseCase: ISearchAllLeaguesUseCase) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['allLeagues'],
    queryFn: async () => {
      const result = await searchAllLeaguesUseCase.execute();

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

  const leagues = data === undefined ? null : data?.data.map((league) => league.toPrimitives);
  const pagination = data === undefined ? null : data?.pagination;

  return {
    isLoading,
    requestError,
    data: {
      leagues,
      pagination,
    },
  };
};
