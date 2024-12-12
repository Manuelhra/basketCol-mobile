import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { IFindAllLeagueTeamsByLeagueIdUseCase } from '../../application/use-cases/ports/IFindAllLeagueTeamsByLeagueIdUseCase';

export interface ILeagueTeamContainer {
  findAllLeagueTeamsByLeagueIdUseCase: IFindAllLeagueTeamsByLeagueIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
