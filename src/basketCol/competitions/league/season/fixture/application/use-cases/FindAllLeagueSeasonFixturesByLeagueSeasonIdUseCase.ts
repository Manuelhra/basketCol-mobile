import { DomainError, Either, Result } from '@basketcol/domain';

import { FindAllLeagueSeasonFixturesByLeagueSeasonIdDTO } from '../dtos/FindAllLeagueSeasonFixturesByLeagueSeasonIdDTO';
import { IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase, IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCaseResponse } from './ports/IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase';
import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { DomainErrorMapper } from '../../../../../../shared/application/mappers/DomainErrorMapper';
import { FindAllLeagueSeasonFixturesByLeagueSeasonIdHttpResponseDTO } from '../dtos/FindAllLeagueSeasonFixturesByLeagueSeasonIdHttpResponseDTO';
import { LeagueSeasonFixtureDomainEntityMapper } from '../mappers/LeagueSeasonFixtureDomainEntityMapper';
import { LeagueSeasonDomainEntityMapper } from '../../../application/mappers/LeagueSeasonDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase implements IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase {
    return new FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase(dependencies);
  }

  public async execute(dto: FindAllLeagueSeasonFixturesByLeagueSeasonIdDTO): Promise<Result<IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindAllLeagueSeasonFixturesByLeagueSeasonIdHttpResponseDTO>(
      `/competitions/leagues/seasons/${dto.leagueSeasonId}/fixtures`,
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
    data: FindAllLeagueSeasonFixturesByLeagueSeasonIdHttpResponseDTO,
  ): Result<IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCaseResponse> {
    if (data === null) return Either.right(null);

    return Either.right({
      leagueSeasonFixtures: data.leagueSeasonFixtures.map((leagueSeasonFixture) => LeagueSeasonFixtureDomainEntityMapper.mapToDomainEntity(leagueSeasonFixture)),
      leagueSeason: LeagueSeasonDomainEntityMapper.mapToDomainEntity(data.leagueSeasonFixtures[0].leagueSeason),
    });
  }
}
