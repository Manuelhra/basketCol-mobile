import { DomainError } from '@basketcol/domain';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase } from '../../../../../../../../basketCol/competitions/league/season/fixture/game/application/use-cases/ports/IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase';

export const useFindAllLeagueSeasonFixtureGamesByFixtureId = (
  findAllLeagueSeasonFixtureGamesByFixtureIdUseCase: IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase,
  fixtureId: string,
) => {
  const [requestError, setRequestError] = useState<DomainError[] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ['leagueSeasonFixtureGames', fixtureId],
    queryFn: async () => {
      const result = await findAllLeagueSeasonFixtureGamesByFixtureIdUseCase.execute({ fixtureId });

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

  // Transform the raw data to include complete team objects
  const processedData = (() => {
    if (data === undefined || data === null) return null;

    const teams = data.teamList.map((team) => team.toPrimitives);
    const teamsMap = new Map(teams.map((team) => [team.id, team]));

    const games = data.leagueSeasonFixtureGames.map((game) => {
      const gamePrimitives = game.toPrimitives;
      return {
        ...gamePrimitives,
        homeTeam: teamsMap.get(gamePrimitives.homeTeamId),
        awayTeam: teamsMap.get(gamePrimitives.awayTeamId),
      };
    });

    return {
      leagueSeasonFixtureGames: games,
      teamList: teams,
    };
  })();

  return {
    isLoading,
    requestError,
    data: processedData,
  };
};
