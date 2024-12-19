import { DomainError, Either, Result } from '@basketcol/domain';

import { FindLeagueSeasonFixtureByIdDTO } from '../dtos/FindLeagueSeasonFixtureByIdDTO';
import { IFindLeagueSeasonFixtureByIdUseCase, IFindLeagueSeasonFixtureByIdUseCaseResponse } from './ports/IFindLeagueSeasonFixtureByIdUseCase';
import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { DomainErrorMapper } from '../../../../../../shared/application/mappers/DomainErrorMapper';
import { FindLeagueSeasonFixtureByIdHttpResponseDTO } from '../dtos/FindLeagueSeasonFixtureByIdHttpResponseDTO';
import { LeagueSeasonFixtureDomainEntityMapper } from '../mappers/LeagueSeasonFixtureDomainEntityMapper';
import { LeagueSeasonDomainEntityMapper } from '../../../application/mappers/LeagueSeasonDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindLeagueSeasonFixtureByIdUseCase implements IFindLeagueSeasonFixtureByIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindLeagueSeasonFixtureByIdUseCase {
    return new FindLeagueSeasonFixtureByIdUseCase(dependencies);
  }

  public async execute(dto: FindLeagueSeasonFixtureByIdDTO): Promise<Result<IFindLeagueSeasonFixtureByIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindLeagueSeasonFixtureByIdHttpResponseDTO>(
      `/competitions/leagues/seasons/fixtures/${dto.id}`,
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
    data: FindLeagueSeasonFixtureByIdHttpResponseDTO,
  ): Result<IFindLeagueSeasonFixtureByIdUseCaseResponse> {
    if (data === null) return Either.right(null);

    return Either.right({
      leagueSeasonFixture: LeagueSeasonFixtureDomainEntityMapper.mapToDomainEntity(data.leagueSeasonFixture),
      leagueSeason: LeagueSeasonDomainEntityMapper.mapToDomainEntity(data.leagueSeasonFixture.leagueSeason),
    });
  }
}
