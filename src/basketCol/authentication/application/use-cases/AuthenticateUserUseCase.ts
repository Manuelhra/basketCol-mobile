import {
  Result,
  Either,
  DomainError,
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
import { IErrorDetail } from '../../../shared/application/http/ports/IErrorApiResponse';
import { AnySystemUserTypeDTO } from '../../../users/shared/application/dtos/AnySystemUserTypeDTO';
import { HostUserDomainEntityMapper } from '../../../users/host/application/mappers/HostUserDomainEntityMapper';
import { LeagueFounderUserDomainEntityMapper } from '../../../users/league-founder/application/mappers/LeagueFounderUserDomainEntityMapper';
import { PlayerUserDomainEntityMapper } from '../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { RefereeUserDomainEntityMapper } from '../../../users/referee/application/mappers/RefereeUserDomainEntityMapper';
import { TeamFounderUserDomainEntityMapper } from '../../../users/team-founder/application/mappers/TeamFounderUserDomainEntityMapper';
import { PlayerUserDTO } from '../../../users/player/application/dtos/PlayerUserDTO';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';

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
      return this.#handleHttpError(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    const setStoreAuthTokenResult = await this.#authenticationTokenStorage.setStoreAuthenticationToken(successResponseInfo.data.authenticationToken);

    if (setStoreAuthTokenResult.isLeft) {
      return Either.left(setStoreAuthTokenResult.left());
    }

    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleHttpError(errorResponseInfo: { type: string; error?: IErrorDetail; errors?: IErrorDetail[] }): Result<AuthenticationResponse> {
    if (errorResponseInfo.type === 'single' && errorResponseInfo.error) {
      const domainError = DomainError.createSingle(errorResponseInfo.error.name, errorResponseInfo.error.details);
      return Either.left({ type: 'single', error: domainError });
    }

    if (errorResponseInfo.type === 'multiple' && errorResponseInfo.errors) {
      const domainErrors = this.#parseMultipleErrors(errorResponseInfo.errors);
      return Either.left({ type: 'multiple', errors: domainErrors });
    }

    return Either.left({ type: 'single', error: DomainError.createSingle('UnknownError', 'An unknown error occurred') });
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

  #parseMultipleErrors(errors: IErrorDetail[]): DomainError[] {
    return errors.map((error) => DomainError.createSingle(error.name, error.details, error.field));
  }
}
