import {
  Result,
  IPaginatedResponse,
  League,
  DomainError,
  Either,
  IPaginationParams,
} from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { ISearchAllLeaguesUseCase } from './ports/ISearchAllLeaguesUseCase';
import { DomainErrorMapper } from '../../../../shared/application/mappers/DomainErrorMapper';
import { SearchAllLeaguesHttpResponseDTO } from '../dtos/SearchAllLeaguesHttpResponseDTO';
import { LeagueDomainEntityMapper } from '../mappers/LeagueDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class SearchAllLeaguesUseCase implements ISearchAllLeaguesUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): SearchAllLeaguesUseCase {
    return new SearchAllLeaguesUseCase(dependencies);
  }

  public async execute(): Promise<Result<IPaginatedResponse<League>>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<SearchAllLeaguesHttpResponseDTO>(
      '/competitions/leagues',
      { headers: { Authorization: `Bearer ${authenticationToken}` } },
    );

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    return this.#handleSuccessResponse(successResponseInfo.data, successResponseInfo.pagination as IPaginationParams);
  }

  #handleSuccessResponse(
    data: SearchAllLeaguesHttpResponseDTO,
    pagination: IPaginationParams,
  ): Result<IPaginatedResponse<League>> {
    return Either.right({
      data: data.leagues.map((league) => LeagueDomainEntityMapper.mapToDomainEntity(league)),
      pagination,
    });
  }
}
