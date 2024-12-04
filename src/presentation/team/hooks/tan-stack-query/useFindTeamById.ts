import { useState } from 'react';
import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';

import { IFindTeamByIdUseCase } from '../../../../basketCol/team/application/use-cases/ports/IFindTeamByIdUseCase';

type Options = {
  enabled?: boolean;
};

export const useFindTeamById = (findTeamByIdUseCase: IFindTeamByIdUseCase, teamId: string, options?: Options) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const result = await findTeamByIdUseCase.execute({ teamId });

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
    enabled: options?.enabled,
  });

  const findTeamByIdUseCaseResponse = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    findTeamByIdUseCaseResponse,
  };
};
