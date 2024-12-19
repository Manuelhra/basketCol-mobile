import { DomainError, Either, Result } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { FindLeagueSeasonByIdDTO } from '../dtos/FindLeagueSeasonByIdDTO';
import { IFindLeagueSeasonByIdUseCase, IFindLeagueSeasonByIdUseCaseResponse } from './ports/IFindLeagueSeasonByIdUseCase';
import { DomainErrorMapper } from '../../../../../shared/application/mappers/DomainErrorMapper';
import { FindLeagueSeasonByIdHttpResponseDTO } from '../dtos/FindLeagueSeasonByIdHttpResponseDTO';
import { LeagueSeasonDomainEntityMapper } from '../mappers/LeagueSeasonDomainEntityMapper';
import { LeagueDomainEntityMapper } from '../../../application/mappers/LeagueDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindLeagueSeasonByIdUseCase implements IFindLeagueSeasonByIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindLeagueSeasonByIdUseCase {
    return new FindLeagueSeasonByIdUseCase(dependencies);
  }

  public async execute(dto: FindLeagueSeasonByIdDTO): Promise<Result<IFindLeagueSeasonByIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindLeagueSeasonByIdHttpResponseDTO>(
      `/competitions/leagues/seasons/${dto.id}`,
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
    data: FindLeagueSeasonByIdHttpResponseDTO,
  ): Result<IFindLeagueSeasonByIdUseCaseResponse> {
    if (data === null) return Either.right(null);

    return Either.right({
      leagueSeason: LeagueSeasonDomainEntityMapper.mapToDomainEntity(data.leagueSeason),
      league: LeagueDomainEntityMapper.mapToDomainEntity(data.leagueSeason.league),
    });
  }
}
