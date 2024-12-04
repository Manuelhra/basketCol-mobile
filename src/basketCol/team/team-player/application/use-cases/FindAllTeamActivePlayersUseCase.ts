import { DomainError, Either, Result } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { FindAllTeamActivePlayersDTO } from '../dtos/FindAllTeamActivePlayersDTO';
import { IFindAllTeamActivePlayersUseCase, IFindAllTeamActivePlayersUseCaseResponse } from './ports/IFindAllTeamActivePlayersUseCase';
import { FindAllTeamActivePlayersHttpResponseDTO } from '../dtos/FindAllTeamActivePlayersHttpResponseDTO';
import { DomainErrorMapper } from '../../../../shared/application/mappers/DomainErrorMapper';
import { PlayerUserDomainEntityMapper } from '../../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { TeamDomainEntityMapper } from '../../../application/mappers/TeamDomainEntityMapper';
import { TeamPlayerDomainEntityMapper } from '../mappers/TeamPlayerDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindAllTeamActivePlayersUseCase implements IFindAllTeamActivePlayersUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindAllTeamActivePlayersUseCase {
    return new FindAllTeamActivePlayersUseCase(dependencies);
  }

  public async execute(dto: FindAllTeamActivePlayersDTO): Promise<Result<IFindAllTeamActivePlayersUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindAllTeamActivePlayersHttpResponseDTO>(
      `/teams/${dto.teamId}/players/active`,
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
    data: FindAllTeamActivePlayersHttpResponseDTO,
  ): Result<IFindAllTeamActivePlayersUseCaseResponse> {
    if (data === null) {
      return Either.right(null);
    }

    return Either.right({
      teamInfo: TeamDomainEntityMapper.mapToDomainEntity(data.teamPlayers[0].team),
      playerUserList: data.teamPlayers.map((teamPlayer) => PlayerUserDomainEntityMapper.mapToDomainEntity(teamPlayer.playerUser)),
      teamPlayers: data.teamPlayers.map((teamPlayer) => TeamPlayerDomainEntityMapper.mapToDomainEntity(teamPlayer)),
    });
  }
}
