import { IAuthenticationTokenStorage } from '../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { GetPlayerUserAttributeCategoriesUseCase } from '../../../application/use-cases/GetPlayerUserAttributeCategoriesUseCase';
import { IGetPlayerUserAttributeCategoriesUseCase } from '../../../application/use-cases/ports/IGetPlayerUserAttributeCategoriesUseCase';
import { IPlayerUserAttributesContainer } from '../IPlayerUserAttributesContainer';

export class AwilixPlayerUserAttributesDependencyInjector extends AwilixDependencyInjector<IPlayerUserAttributesContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      getPlayerUserAttributeCategoriesUseCase: AwilixDependencyInjector.registerAsFunction<IGetPlayerUserAttributeCategoriesUseCase>(GetPlayerUserAttributeCategoriesUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixPlayerUserAttributesDependencyInjector {
    return new AwilixPlayerUserAttributesDependencyInjector();
  }
}
