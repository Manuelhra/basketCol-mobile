import { IAuthenticationTokenStorage } from '../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase } from '../../../application/use-cases/FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase';
import { FindLeagueSeasonFixtureByIdUseCase } from '../../../application/use-cases/FindLeagueSeasonFixtureByIdUseCase';
import { IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase } from '../../../application/use-cases/ports/IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase';
import { IFindLeagueSeasonFixtureByIdUseCase } from '../../../application/use-cases/ports/IFindLeagueSeasonFixtureByIdUseCase';
import { ILeagueSeasonFixtureContainer } from '../ILeagueSeasonFixtureContainer';

export class AwilixLeagueSeasonFixtureDependencyInjector extends AwilixDependencyInjector<ILeagueSeasonFixtureContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase>(FindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase.create).singleton(),
      findLeagueSeasonFixtureByIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindLeagueSeasonFixtureByIdUseCase>(FindLeagueSeasonFixtureByIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixLeagueSeasonFixtureDependencyInjector {
    return new AwilixLeagueSeasonFixtureDependencyInjector();
  }
}
