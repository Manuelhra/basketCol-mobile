import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindTeamByIdUseCase } from '../../../application/use-cases/FindTeamByIdUseCase';
import { IFindTeamByIdUseCase } from '../../../application/use-cases/ports/IFindTeamByIdUseCase';
import { ITeamContainer } from '../ITeamContainer';

export class AwilixTeamDependencyInjector extends AwilixDependencyInjector<ITeamContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findTeamByIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindTeamByIdUseCase>(FindTeamByIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixTeamDependencyInjector {
    return new AwilixTeamDependencyInjector();
  }
}
