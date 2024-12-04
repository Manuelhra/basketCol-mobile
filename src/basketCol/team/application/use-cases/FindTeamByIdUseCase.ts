import { DomainError, Either, Result } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { FindTeamByIdDTO } from '../dtos/FindTeamByIdDTO';
import { IFindTeamByIdUseCase, IFindTeamByIdUseCaseResponse } from './ports/IFindTeamByIdUseCase';
import { FindTeamByIdHttpResponseDTO } from '../dtos/FindTeamByIdHttpResponseDTO';
import { DomainErrorMapper } from '../../../shared/application/mappers/DomainErrorMapper';
import { TeamDomainEntityMapper } from '../mappers/TeamDomainEntityMapper';
import { TeamAllTimeStatsDomainEntityMapper } from '../../all-time-stats/application/mappers/TeamAllTimeStatsDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindTeamByIdUseCase implements IFindTeamByIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindTeamByIdUseCase {
    return new FindTeamByIdUseCase(dependencies);
  }

  public async execute(dto: FindTeamByIdDTO): Promise<Result<IFindTeamByIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindTeamByIdHttpResponseDTO>(
      `/teams/${dto.teamId}`,
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
    data: FindTeamByIdHttpResponseDTO,
  ): Result<IFindTeamByIdUseCaseResponse> {
    if (data === null) {
      return Either.right({
        team: null,
        teamAllTimeStats: null,
      });
    }

    return Either.right({
      team: TeamDomainEntityMapper.mapToDomainEntity(data.team),
      teamAllTimeStats: TeamAllTimeStatsDomainEntityMapper.mapToDomainEntity(data.teamAllTimeStats),
    });
  }
}
