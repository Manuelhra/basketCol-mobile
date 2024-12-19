import { IAuthenticationTokenStorage } from '../../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase } from '../../../application/use-cases/FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase';
import { IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase } from '../../../application/use-cases/ports/IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase';
import { ILeagueSeasonFixtureGameContainer } from '../ILeagueSeasonFixtureGameContainer';

export class AwilixLeagueSeasonFixtureGameDependencyInjector extends AwilixDependencyInjector<ILeagueSeasonFixtureGameContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findAllLeagueSeasonFixtureGamesByFixtureIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase>(FindAllLeagueSeasonFixtureGamesByFixtureIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixLeagueSeasonFixtureGameDependencyInjector {
    return new AwilixLeagueSeasonFixtureGameDependencyInjector();
  }
}
