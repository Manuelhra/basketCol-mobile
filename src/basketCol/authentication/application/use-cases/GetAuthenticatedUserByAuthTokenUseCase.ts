import {
  Result,
  AnySystemUserType,
  Either,
  DomainError,
  PlayerUserType,
  HostUserType,
  LeagueFounderUserType,
  RefereeUserType,
  TeamFounderUserType,
  InvalidUserTypeError,
} from '@basketcol/domain';

import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IGetAuthenticatedUserByAuthTokenUseCase } from './ports/IGetAuthenticatedUserByAuthTokenUseCase';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';
import { AnySystemUserTypeDTO } from '../../../users/shared/application/dtos/AnySystemUserTypeDTO';
import { PlayerUserDomainEntityMapper } from '../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { PlayerUserDTO } from '../../../users/player/application/dtos/PlayerUserDTO';
import { HostUserDomainEntityMapper } from '../../../users/host/application/mappers/HostUserDomainEntityMapper';
import { LeagueFounderUserDomainEntityMapper } from '../../../users/league-founder/application/mappers/LeagueFounderUserDomainEntityMapper';
import { RefereeUserDomainEntityMapper } from '../../../users/referee/application/mappers/RefereeUserDomainEntityMapper';
import { TeamFounderUserDomainEntityMapper } from '../../../users/team-founder/application/mappers/TeamFounderUserDomainEntityMapper';
import { DomainErrorMapper } from '../../../shared/application/mappers/DomainErrorMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class GetAuthenticatedUserByAuthTokenUseCase implements IGetAuthenticatedUserByAuthTokenUseCase {
  readonly #basketColHttpClient: IHttpClient;

  readonly #authenticationTokenStorage: IAuthenticationTokenStorage;

  private constructor(dependencies: Dependencies) {
    this.#basketColHttpClient = dependencies.basketColHttpClient;
    this.#authenticationTokenStorage = dependencies.authenticationTokenStorage;
  }

  public static create(dependencies: Dependencies): GetAuthenticatedUserByAuthTokenUseCase {
    return new GetAuthenticatedUserByAuthTokenUseCase(dependencies);
  }

  public async execute(): Promise<Result<AnySystemUserType>> {
    const getAuthenticationTokenResult = await this.#authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.#authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.#basketColHttpClient.get<{ authenticatedUser: AnySystemUserTypeDTO; }>('/authentication/users/me', { headers: { Authorization: `Bearer ${authenticationToken}` } });

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleSuccessResponse(data: { authenticatedUser: AnySystemUserTypeDTO; }): Result<AnySystemUserType> {
    const authenticatedUser = this.#mapAuthenticatedUser(data.authenticatedUser);

    return Either.right(authenticatedUser);
  }

  #mapAuthenticatedUser(userDTO: AnySystemUserTypeDTO): AnySystemUserType {
    switch (userDTO.type) {
      case PlayerUserType.value:
        return PlayerUserDomainEntityMapper.mapToDomainEntity(userDTO as PlayerUserDTO);

      case HostUserType.value:
        return HostUserDomainEntityMapper.mapToDomainEntity(userDTO);

      case LeagueFounderUserType.value:
        return LeagueFounderUserDomainEntityMapper.mapToDomainEntity(userDTO);

      case RefereeUserType.value:
        return RefereeUserDomainEntityMapper.mapToDomainEntity(userDTO);

      case TeamFounderUserType.value:
        return TeamFounderUserDomainEntityMapper.mapToDomainEntity(userDTO);

      default:
        throw InvalidUserTypeError.create(userDTO.type);
    }
  }
}
