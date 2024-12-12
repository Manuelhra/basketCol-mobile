import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindAllLeagueTeamsByLeagueIdUseCase } from '../../../application/use-cases/FindAllLeagueTeamsByLeagueIdUseCase';
import { IFindAllLeagueTeamsByLeagueIdUseCase } from '../../../application/use-cases/ports/IFindAllLeagueTeamsByLeagueIdUseCase';
import { ILeagueTeamContainer } from '../ILeagueTeamContainer';

export class AwilixLeagueTeamDependencyInjector extends AwilixDependencyInjector<ILeagueTeamContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findAllLeagueTeamsByLeagueIdUseCase: AwilixDependencyInjector.registerAsFunction<IFindAllLeagueTeamsByLeagueIdUseCase>(FindAllLeagueTeamsByLeagueIdUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixLeagueTeamDependencyInjector {
    return new AwilixLeagueTeamDependencyInjector();
  }
}
