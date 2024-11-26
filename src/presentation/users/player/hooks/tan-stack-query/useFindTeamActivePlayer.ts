import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DomainError } from '@basketcol/domain';

import { IFindTeamActivePlayerUseCase } from '../../../../../basketCol/team/team-player/application/use-cases/ports/IFindTeamActivePlayerUseCase';

export const useFindTeamActivePlayer = (findTeamActivePlayerUseCase: IFindTeamActivePlayerUseCase, playerUserId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['teamActivePlayer', playerUserId],
    queryFn: async () => {
      const result = await findTeamActivePlayerUseCase.execute({ playerUserId });

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

  const teamActivePlayer = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    teamActivePlayer,
  };
};
