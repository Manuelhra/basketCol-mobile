import { IAuthenticationTokenStorage } from '../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../shared/application/http/ports/IHttpClient';
import { IFindLeagueByIdUseCase } from '../../application/use-cases/ports/IFindLeagueByIdUseCase';
import { ISearchAllLeaguesUseCase } from '../../application/use-cases/ports/ISearchAllLeaguesUseCase';

export interface ILeagueContainer {
  searchAllLeaguesUseCase: ISearchAllLeaguesUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
  findLeagueByIdUseCase: IFindLeagueByIdUseCase;
}
