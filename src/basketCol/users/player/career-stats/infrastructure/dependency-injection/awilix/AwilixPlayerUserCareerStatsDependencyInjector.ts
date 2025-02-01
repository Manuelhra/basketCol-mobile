import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindCareerStatsByPlayerUserIdUseCase } from '../../../application/use-cases/FindCareerStatsByPlayerUserIdUseCase';
import { IFindCareerStatsByPlayerUserIdUseCase } from '../../../application/use-cases/ports/IFindCareerStatsByPlayerUserIdUseCase';
import { IPlayerUserCareerStatsContainer } from '../IPlayerUserCareerStatsContainer';

export class AwilixPlayerUserCareerStatsDependencyInjector
  extends AwilixDependencyInjector<IPlayerUserCareerStatsContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findCareerStatsByPlayerUserIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindCareerStatsByPlayerUserIdUseCase>(FindCareerStatsByPlayerUserIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixPlayerUserCareerStatsDependencyInjector {
    return new AwilixPlayerUserCareerStatsDependencyInjector();
  }
}
