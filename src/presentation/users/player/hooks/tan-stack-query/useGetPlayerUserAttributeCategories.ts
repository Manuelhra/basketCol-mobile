import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DomainError } from '@basketcol/domain';

import { IGetPlayerUserAttributeCategoriesUseCase } from '../../../../../basketCol/users/player/attributes/shared/application/use-cases/ports/IGetPlayerUserAttributeCategoriesUseCase';

export const useGetPlayerUserAttributeCategories = (getPlayerUserAttributeCategoriesUseCase: IGetPlayerUserAttributeCategoriesUseCase, playerUserId: string) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['playerUserAttributeCategories', playerUserId],
    queryFn: async () => {
      const result = await getPlayerUserAttributeCategoriesUseCase.execute({ playerUserId });

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

  const playerUserAttributeCategories = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    playerUserAttributeCategories,
  };
};
