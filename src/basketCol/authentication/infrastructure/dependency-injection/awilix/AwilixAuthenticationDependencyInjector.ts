import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { IAuthenticationTokenStorage } from '../../../application/storage/ports/IAuthenticationTokenStorage';
import { AuthenticateUserUseCase } from '../../../application/use-cases/AuthenticateUserUseCase';
import { GetAuthenticatedUserByAuthTokenUseCase } from '../../../application/use-cases/GetAuthenticatedUserByAuthTokenUseCase';
import { LogoutUserUseCase } from '../../../application/use-cases/LogoutUserUseCase';
import { IAuthenticateUserUseCase } from '../../../application/use-cases/ports/IAuthenticateUserUseCase';
import { IGetAuthenticatedUserByAuthTokenUseCase } from '../../../application/use-cases/ports/IGetAuthenticatedUserByAuthTokenUseCase';
import { ILogoutUserUseCase } from '../../../application/use-cases/ports/ILogoutUserUseCase';
import { IValidateAndRefreshAuthenticationTokenUseCase } from '../../../application/use-cases/ports/IValidateAndRefreshAuthenticationTokenUseCase';
import { ValidateAndRefreshAuthenticationTokenUseCase } from '../../../application/use-cases/ValidateAndRefreshAuthenticationTokenUseCase';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IAuthenticationContainer } from '../IAuthenticationContainer';

export class AwilixAuthenticationDependencyInjector extends AwilixDependencyInjector<IAuthenticationContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      authenticateUserUseCase: AwilixDependencyInjector.registerAsFunction<IAuthenticateUserUseCase>(AuthenticateUserUseCase.create).singleton(),
      validateAndRefreshAuthenticationTokenUseCase: AwilixDependencyInjector.registerAsFunction<IValidateAndRefreshAuthenticationTokenUseCase>(ValidateAndRefreshAuthenticationTokenUseCase.create).singleton(),
      logoutUserUseCase: AwilixDependencyInjector.registerAsFunction<ILogoutUserUseCase>(LogoutUserUseCase.create).singleton(),
      getAuthenticatedUserByAuthTokenUseCase: AwilixDependencyInjector.registerAsFunction<IGetAuthenticatedUserByAuthTokenUseCase>(GetAuthenticatedUserByAuthTokenUseCase.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
    });
  }

  public static create(): AwilixAuthenticationDependencyInjector {
    return new AwilixAuthenticationDependencyInjector();
  }
}
