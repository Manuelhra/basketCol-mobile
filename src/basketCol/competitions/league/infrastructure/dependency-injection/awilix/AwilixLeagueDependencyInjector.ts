import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindLeagueByIdUseCase } from '../../../application/use-cases/FindLeagueByIdUseCase';
import { IFindLeagueByIdUseCase } from '../../../application/use-cases/ports/IFindLeagueByIdUseCase';
import { ISearchAllLeaguesUseCase } from '../../../application/use-cases/ports/ISearchAllLeaguesUseCase';
import { SearchAllLeaguesUseCase } from '../../../application/use-cases/SearchAllLeaguesUseCase';
import { ILeagueContainer } from '../ILeagueContainer';

export class AwilixLeagueDependencyInjector extends AwilixDependencyInjector<ILeagueContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      searchAllLeaguesUseCase: AwilixDependencyInjector.registerAsFunction<ISearchAllLeaguesUseCase>(SearchAllLeaguesUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
      findLeagueByIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindLeagueByIdUseCase>(FindLeagueByIdUseCase.create).singleton(),
    });
  }

  public static create(): AwilixLeagueDependencyInjector {
    return new AwilixLeagueDependencyInjector();
  }
}
