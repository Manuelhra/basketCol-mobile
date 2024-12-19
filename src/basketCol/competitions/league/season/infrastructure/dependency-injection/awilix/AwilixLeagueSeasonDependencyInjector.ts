import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindAllLeagueSeasonsByLeagueIdUseCase } from '../../../application/use-cases/FindAllLeagueSeasonsByLeagueIdUseCase';
import { FindLeagueSeasonByIdUseCase } from '../../../application/use-cases/FindLeagueSeasonByIdUseCase';
import { IFindAllLeagueSeasonsByLeagueIdUseCase } from '../../../application/use-cases/ports/IFindAllLeagueSeasonsByLeagueIdUseCase';
import { IFindLeagueSeasonByIdUseCase } from '../../../application/use-cases/ports/IFindLeagueSeasonByIdUseCase';
import { ILeagueSeasonContainer } from '../ILeagueSeasonContainer';

export class AwilixLeagueSeasonDependencyInjector extends AwilixDependencyInjector<ILeagueSeasonContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findAllLeagueSeasonsByLeagueIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindAllLeagueSeasonsByLeagueIdUseCase>(FindAllLeagueSeasonsByLeagueIdUseCase.create).singleton(),
      findLeagueSeasonByIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindLeagueSeasonByIdUseCase>(FindLeagueSeasonByIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixLeagueSeasonDependencyInjector {
    return new AwilixLeagueSeasonDependencyInjector();
  }
}
