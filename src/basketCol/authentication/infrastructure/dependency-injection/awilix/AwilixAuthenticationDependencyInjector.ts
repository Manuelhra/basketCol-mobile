import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { IAuthenticationTokenStorage } from '../../../application/storage/ports/IAuthenticationTokenStorage';
import { AuthenticateUserUseCase } from '../../../application/use-cases/AuthenticateUserUseCase';
import { IAuthenticateUserUseCase } from '../../../application/use-cases/ports/IAuthenticateUserUseCase';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IAuthenticationContainer } from '../IAuthenticationContainer';

export class AwilixAuthenticationDependencyInjector extends AwilixDependencyInjector<IAuthenticationContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      authenticateUserUseCase: AwilixDependencyInjector.registerAsFunction<IAuthenticateUserUseCase>(AuthenticateUserUseCase.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
    });
  }

  public static create(): AwilixAuthenticationDependencyInjector {
    return new AwilixAuthenticationDependencyInjector();
  }
}
