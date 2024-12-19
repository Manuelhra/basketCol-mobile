import { IAuthenticationTokenStorage } from '../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindLeagueSeasonAwardsByLeagueSeasonIdUseCase } from '../../../application/use-cases/FindLeagueSeasonAwardsByLeagueSeasonIdUseCase';
import { IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase } from '../../../application/use-cases/ports/IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase';
import { ILeagueSeasonAwardsContainer } from '../ILeagueSeasonAwardsContainer';

export class AwilixLeagueSeasonAwardsDependencyInjector extends AwilixDependencyInjector<ILeagueSeasonAwardsContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findLeagueSeasonAwardsByLeagueSeasonIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase>(FindLeagueSeasonAwardsByLeagueSeasonIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixLeagueSeasonAwardsDependencyInjector {
    return new AwilixLeagueSeasonAwardsDependencyInjector();
  }
}
