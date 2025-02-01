import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DomainError } from '@basketcol/domain';

import { IFindCareerStatsByPlayerUserIdUseCase } from '../../../../../basketCol/users/player/career-stats/application/use-cases/ports/IFindCareerStatsByPlayerUserIdUseCase';

export const useFindCareerStatsByPlayerUserId = (findCareerStatsByPlayerUserIdUseCase: IFindCareerStatsByPlayerUserIdUseCase, playerUserId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['careerStatsByPlayerUserId', playerUserId],
    queryFn: async () => {
      const result = await findCareerStatsByPlayerUserIdUseCase.execute({ playerUserId });

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

  const playerUserCareerStats = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    playerUserCareerStats,
  };
};
