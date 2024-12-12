import { DomainError, Either, Result } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { FindLeagueByIdDTO } from '../dtos/FindLeagueByIdDTO';
import { IFindLeagueByIdUseCase, IFindLeagueByIdUseCaseResponse } from './ports/IFindLeagueByIdUseCase';
import { FindLeagueByIdHttpResponseDTO } from '../dtos/FindLeagueByIdHttpResponseDTO';
import { DomainErrorMapper } from '../../../../shared/application/mappers/DomainErrorMapper';
import { LeagueDomainEntityMapper } from '../mappers/LeagueDomainEntityMapper';
import { LeagueFounderUserDomainEntityMapper } from '../../../../users/league-founder/application/mappers/LeagueFounderUserDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindLeagueByIdUseCase implements IFindLeagueByIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindLeagueByIdUseCase {
    return new FindLeagueByIdUseCase(dependencies);
  }

  public async execute(dto: FindLeagueByIdDTO): Promise<Result<IFindLeagueByIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindLeagueByIdHttpResponseDTO>(
      `/competitions/leagues/${dto.id}`,
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
    data: FindLeagueByIdHttpResponseDTO,
  ): Result<IFindLeagueByIdUseCaseResponse> {
    if (data === null) return Either.right(null);

    return Either.right({
      league: LeagueDomainEntityMapper.mapToDomainEntity(data),
      leagueFounderUser: LeagueFounderUserDomainEntityMapper.mapToDomainEntity(data.leagueFounderUser),
    });
  }
}
