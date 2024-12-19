import { DomainError, Either, Result } from '@basketcol/domain';
import { IAuthenticationTokenStorage } from '../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../shared/application/http/ports/IHttpClient';
import { FindAllLeagueSeasonFixtureGamesByFixtureIdDTO } from '../dtos/FindAllLeagueSeasonFixtureGamesByFixtureIdDTO';
import {
  FindAllLeagueSeasonFixtureGamesByFixtureIdUseCaseResponse,
  IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase,
} from './ports/IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase';
import { DomainErrorMapper } from '../../../../../../../shared/application/mappers/DomainErrorMapper';
import { FindAllLeagueSeasonFixtureGamesByFixtureIdHttpResponseDTO } from '../dtos/FindAllLeagueSeasonFixtureGamesByFixtureIdHttpResponseDTO';
import { LeagueSeasonFixtureGameDomainEntityMapper } from '../mappers/LeagueSeasonFixtureGameDomainEntityMapper';
import { TeamDomainEntityMapper } from '../../../../../../../team/application/mappers/TeamDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase implements IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase {
    return new FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase(dependencies);
  }

  public async execute(
    dto: FindAllLeagueSeasonFixtureGamesByFixtureIdDTO,
  ): Promise<Result<FindAllLeagueSeasonFixtureGamesByFixtureIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({
        type: 'single',
        error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found'),
      });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindAllLeagueSeasonFixtureGamesByFixtureIdHttpResponseDTO>(
      `/competitions/leagues/seasons/fixtures/${dto.fixtureId}/games`,
      { headers: { Authorization: `Bearer ${authenticationToken}` } },
    );

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleSuccessResponse(
    data: FindAllLeagueSeasonFixtureGamesByFixtureIdHttpResponseDTO,
  ): Result<FindAllLeagueSeasonFixtureGamesByFixtureIdUseCaseResponse> {
    // Create a Map to store unique teams using their IDs
    const uniqueTeamsMap = new Map();

    // Add both home and away teams to the map
    data.leagueSeasonFixtureGames.forEach((game) => {
      uniqueTeamsMap.set(game.homeTeam.id, game.homeTeam);
      uniqueTeamsMap.set(game.awayTeam.id, game.awayTeam);
    });

    // Convert Map values to array to get unique teams
    const uniqueTeams = Array.from(uniqueTeamsMap.values());

    return Either.right({
      leagueSeasonFixtureGames: data.leagueSeasonFixtureGames.map((game) => LeagueSeasonFixtureGameDomainEntityMapper.mapToDomainEntity(game)),
      teamList: uniqueTeams.map((team) => TeamDomainEntityMapper.mapToDomainEntity(team)),
    });
  }
}
