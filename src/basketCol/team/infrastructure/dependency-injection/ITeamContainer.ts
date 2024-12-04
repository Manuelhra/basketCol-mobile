import { IAuthenticationTokenStorage } from '../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IFindTeamByIdUseCase } from '../../application/use-cases/ports/IFindTeamByIdUseCase';

export interface ITeamContainer {
  findTeamByIdUseCase: IFindTeamByIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
