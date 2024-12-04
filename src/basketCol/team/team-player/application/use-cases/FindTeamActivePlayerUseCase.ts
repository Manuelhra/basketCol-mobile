import { Result, DomainError, Either } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { FindTeamActivePlayerDTO } from '../dtos/FindTeamActivePlayerDTO';
import { IFindTeamActivePlayerUseCase, IFindTeamActivePlayerUseCaseResponse } from './ports/IFindTeamActivePlayerUseCase';
import { DomainErrorMapper } from '../../../../shared/application/mappers/DomainErrorMapper';
import { TeamPlayerDomainEntityMapper } from '../mappers/TeamPlayerDomainEntityMapper';
import { TeamDomainEntityMapper } from '../../../application/mappers/TeamDomainEntityMapper';
import { PlayerUserDomainEntityMapper } from '../../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { TeamPlayerHttpResponseDTO } from '../dtos/TeamPlayerHttpResponseDTO';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindTeamActivePlayerUseCase implements IFindTeamActivePlayerUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindTeamActivePlayerUseCase {
    return new FindTeamActivePlayerUseCase(dependencies);
  }

  public async execute(dto: FindTeamActivePlayerDTO): Promise<Result<IFindTeamActivePlayerUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<TeamPlayerHttpResponseDTO>(
      `/teams/players/${dto.playerUserId}/active`,
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
    data: TeamPlayerHttpResponseDTO,
  ): Result<IFindTeamActivePlayerUseCaseResponse> {
    if (data === null) {
      return Either.right(null);
    }

    return Either.right({
      teamPlayer: TeamPlayerDomainEntityMapper.mapToDomainEntity(data),
      teamInfo: TeamDomainEntityMapper.mapToDomainEntity(data.team),
      playerUserInfo: PlayerUserDomainEntityMapper.mapToDomainEntity(data.playerUser),
    });
  }
}
