import { AnySystemUserType, DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { IGetAuthenticatedUserByAuthTokenUseCase } from '../../../basketCol/authentication/application/use-cases/ports/IGetAuthenticatedUserByAuthTokenUseCase';

type RequestError = {
  type: 'single';
  error: DomainError;
} | {
  type: 'multiple';
  errors: DomainError[];
};

export const useGetAuthenticatedUserByAuthToken = (
  getAuthenticatedUserByAuthToken: IGetAuthenticatedUserByAuthTokenUseCase,
  options: { enabled: boolean; },
) => {
  const [requestError, setRequestError] = useState<RequestError | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['authenticatedUser', 'authenticationToken'],
    queryFn: async () => {
      const result = await getAuthenticatedUserByAuthToken.execute();

      if (result.isLeft) {
        setRequestError(result.left());
        return null;
      }

      return result.right();
    },
    enabled: options.enabled,
  });

  const authenticatedUser: AnySystemUserType | null = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    authenticatedUser,
  };
};
