import { Result, DomainError, Either } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { FindTeamActivePlayerDTO } from '../dtos/FindTeamActivePlayerDTO';
import { IFindTeamActivePlayerUseCase, IFindTeamActivePlayerUseCaseResponse } from './ports/IFindTeamActivePlayerUseCase';
import { DomainErrorMapper } from '../../../../shared/application/mappers/DomainErrorMapper';
import { TeamPlayerDomainEntityMapper } from '../mappers/TeamPlayerDomainEntityMapper';
import { TeamPlayerDTO } from '../dtos/TeamPlayerDTO';
import { TeamDTO } from '../../../application/dtos/TeamDTO';
import { TeamDomainEntityMapper } from '../../../application/mappers/TeamDomainEntityMapper';
import { PlayerUserDTO } from '../../../../users/player/application/dtos/PlayerUserDTO';
import { PlayerUserDomainEntityMapper } from '../../../../users/player/application/mappers/PlayerUserDomainEntityMapper';

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
    const httpResult = await this.dependencies.basketColHttpClient.get<ITeamPlayerHttpResponse>(
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
    data: ITeamPlayerHttpResponse,
  ): Result<IFindTeamActivePlayerUseCaseResponse> {
    const { teamPlayer, teamInfo, playerUserInfo } = data;

    if (teamPlayer === null || teamInfo === null || playerUserInfo === null) {
      return Either.right({
        teamPlayer: null,
        teamInfo: null,
        playerUserInfo: null,
      });
    }

    return Either.right({
      teamPlayer: TeamPlayerDomainEntityMapper.mapToDomainEntity(teamPlayer),
      teamInfo: TeamDomainEntityMapper.mapToDomainEntity(teamInfo),
      playerUserInfo: PlayerUserDomainEntityMapper.mapToDomainEntity(playerUserInfo),
    });
  }
}

// # types

type ITeamPlayerHttpResponse = {
  teamPlayer: TeamPlayerDTO;
  teamInfo: TeamDTO;
  playerUserInfo: PlayerUserDTO;
} | {
  teamPlayer: null;
  teamInfo: null;
  playerUserInfo: null;
};
