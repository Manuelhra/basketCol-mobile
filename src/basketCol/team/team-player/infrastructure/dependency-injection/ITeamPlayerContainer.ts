import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { IFindTeamActivePlayerUseCase } from '../../application/use-cases/ports/IFindTeamActivePlayerUseCase';

export interface ITeamPlayerContainer {
  findTeamActivePlayerUseCase: IFindTeamActivePlayerUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
