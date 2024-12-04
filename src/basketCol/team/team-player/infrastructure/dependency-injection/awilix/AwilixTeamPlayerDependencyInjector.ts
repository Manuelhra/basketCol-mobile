import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { ReactNativeAsyncAuthenticationTokenStorage } from '../../../../../authentication/infrastructure/storage/ReactNativeAsyncAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { AwilixDependencyInjector } from '../../../../../shared/infrastructure/dependency-injection/awilix/AwilixDependencyInjector';
import { AxiosBasketColHttpClient } from '../../../../../shared/infrastructure/http/AxiosBasketColHttpClient';
import { FindAllTeamActivePlayersUseCase } from '../../../application/use-cases/FindAllTeamActivePlayersUseCase';
import { FindTeamActivePlayerUseCase } from '../../../application/use-cases/FindTeamActivePlayerUseCase';
import { IFindAllTeamActivePlayersUseCase } from '../../../application/use-cases/ports/IFindAllTeamActivePlayersUseCase';
import { IFindTeamActivePlayerUseCase } from '../../../application/use-cases/ports/IFindTeamActivePlayerUseCase';
import { ITeamPlayerContainer } from '../ITeamPlayerContainer';

export class AwilixTeamPlayerDependencyInjector extends AwilixDependencyInjector<ITeamPlayerContainer> {
  private constructor() {
    super();

    this.createContainer();
    this.registerDependencies({
      findTeamActivePlayerUseCase: AwilixDependencyInjector.registerAsFunction<IFindTeamActivePlayerUseCase>(FindTeamActivePlayerUseCase.create).singleton(),
      findAllTeamActivePlayersUseCase: AwilixDependencyInjector.registerAsFunction<IFindAllTeamActivePlayersUseCase>(FindAllTeamActivePlayersUseCase.create).singleton(),
      basketColHttpClient: AwilixDependencyInjector.registerAsFunction<IHttpClient>(AxiosBasketColHttpClient.create).singleton(),
      authenticationTokenStorage: AwilixDependencyInjector.registerAsFunction<IAuthenticationTokenStorage>(ReactNativeAsyncAuthenticationTokenStorage.create).singleton(),
    });
  }

  public static create(): AwilixTeamPlayerDependencyInjector {
    return new AwilixTeamPlayerDependencyInjector();
  }
}
