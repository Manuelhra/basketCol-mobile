import {
  Result,
  Nullable,
  PlayerUserCareerStats,
  DomainError,
  Either,
} from '@basketcol/domain';

import { FindCareerStatsByPlayerUserIdHttpResponseDTO } from '../dtos/FindCareerStatsByPlayerUserIdHttpResponseDTO';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IFindCareerStatsByPlayerUserIdUseCase } from './ports/IFindCareerStatsByPlayerUserIdUseCase';
import { FindCareerStatsByPlayerUserIdDTO } from '../dtos/FindCareerStatsByPlayerUserIdDTO';
import { DomainErrorMapper } from '../../../../../shared/application/mappers/DomainErrorMapper';
import { PlayerUserCareerStatsDomainEntityMapper } from '../mappers/PlayerUserCareerStatsDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindCareerStatsByPlayerUserIdUseCase implements IFindCareerStatsByPlayerUserIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindCareerStatsByPlayerUserIdUseCase {
    return new FindCareerStatsByPlayerUserIdUseCase(dependencies);
  }

  public async execute(dto: FindCareerStatsByPlayerUserIdDTO): Promise<Result<Nullable<PlayerUserCareerStats>>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindCareerStatsByPlayerUserIdHttpResponseDTO>(
      `/users/players/${dto.playerUserId}/career-stats`,
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
    data: FindCareerStatsByPlayerUserIdHttpResponseDTO,
  ): Result<Nullable<PlayerUserCareerStats>> {
    if (data === null) return Either.right(null);

    return Either.right(
      PlayerUserCareerStatsDomainEntityMapper.mapToDomainEntity(data.playerUserCareerStats),
    );
  }
}
