import { useState } from 'react';
import { DomainError } from '@basketcol/domain';
import { useQuery } from '@tanstack/react-query';

import { IFindAllTeamActivePlayersUseCase } from '../../../../basketCol/team/team-player/application/use-cases/ports/IFindAllTeamActivePlayersUseCase';

type Options = {
  enabled?: boolean;
};

export const useFindAllTeamActivePlayers = (findAllTeamActivePlayersUseCase: IFindAllTeamActivePlayersUseCase, teamId: string, options?: Options) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['teamActivePlayers', teamId],
    queryFn: async () => {
      const result = await findAllTeamActivePlayersUseCase.execute({ teamId });

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

  const teamActivePlayers = data === undefined ? null : data;

  return {
    isLoading,
    requestError,
    teamActivePlayers,
  };
};
