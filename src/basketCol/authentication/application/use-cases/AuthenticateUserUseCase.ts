import {
  Result,
  Either,
  HostUserType,
  AnySystemUserType,
  InvalidUserTypeError,
  LeagueFounderUserType,
  PlayerUserType,
  RefereeUserType,
  TeamFounderUserType,
} from '@basketcol/domain';

import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { IAuthenticateUserUseCase } from './ports/IAuthenticateUserUseCase';
import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { AnySystemUserTypeDTO } from '../../../users/shared/application/dtos/AnySystemUserTypeDTO';
import { HostUserDomainEntityMapper } from '../../../users/host/application/mappers/HostUserDomainEntityMapper';
import { LeagueFounderUserDomainEntityMapper } from '../../../users/league-founder/application/mappers/LeagueFounderUserDomainEntityMapper';
import { PlayerUserDomainEntityMapper } from '../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { RefereeUserDomainEntityMapper } from '../../../users/referee/application/mappers/RefereeUserDomainEntityMapper';
import { TeamFounderUserDomainEntityMapper } from '../../../users/team-founder/application/mappers/TeamFounderUserDomainEntityMapper';
import { PlayerUserHttpResponseDTO } from '../../../users/player/application/dtos/PlayerUserHttpResponseDTO';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';
import { DomainErrorMapper } from '../../../shared/application/mappers/DomainErrorMapper';

type Dependencies = {
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
};

type AuthenticationResponse = {
  authenticatedUser: AnySystemUserType;
  authenticationToken: string;
};

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  readonly #basketColHttpClient: IHttpClient;

  readonly #authenticationTokenStorage: IAuthenticationTokenStorage;

  private constructor(dependencies: Dependencies) {
    this.#basketColHttpClient = dependencies.basketColHttpClient;
    this.#authenticationTokenStorage = dependencies.authenticationTokenStorage;
  }

  public static create(dependencies: Dependencies): AuthenticateUserUseCase {
    return new AuthenticateUserUseCase(dependencies);
  }

  public async execute(dto: AuthenticateUserDTO): Promise<Result<AuthenticationResponse>> {
    const httpResult = await this.#basketColHttpClient.post<{ authenticatedUser: AnySystemUserTypeDTO; authenticationToken: string; }>('/authentication/tokens', { ...dto });

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    const setStoreAuthTokenResult = await this.#authenticationTokenStorage.setStoreAuthenticationToken(successResponseInfo.data.authenticationToken);

    if (setStoreAuthTokenResult.isLeft) {
      return Either.left(setStoreAuthTokenResult.left());
    }

    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleSuccessResponse(data: { authenticatedUser: AnySystemUserTypeDTO; authenticationToken: string }): Result<AuthenticationResponse> {
    const authenticatedUser = this.#mapAuthenticatedUser(data.authenticatedUser);

    return Either.right({
      authenticatedUser,
      authenticationToken: data.authenticationToken,
    });
  }

  #mapAuthenticatedUser(userDTO: AnySystemUserTypeDTO): AnySystemUserType {
    switch (userDTO.type) {
      case PlayerUserType.value:
        return PlayerUserDomainEntityMapper.mapToDomainEntity(userDTO as PlayerUserHttpResponseDTO);

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
