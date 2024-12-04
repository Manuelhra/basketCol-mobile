import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { IFindAllTeamActivePlayersUseCase } from '../../application/use-cases/ports/IFindAllTeamActivePlayersUseCase';
import { IFindTeamActivePlayerUseCase } from '../../application/use-cases/ports/IFindTeamActivePlayerUseCase';

export interface ITeamPlayerContainer {
  findTeamActivePlayerUseCase: IFindTeamActivePlayerUseCase;
  findAllTeamActivePlayersUseCase: IFindAllTeamActivePlayersUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
