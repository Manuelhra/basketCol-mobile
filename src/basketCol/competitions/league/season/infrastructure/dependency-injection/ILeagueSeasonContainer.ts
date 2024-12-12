import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { IFindAllLeagueSeasonsByLeagueIdUseCase } from '../../application/use-cases/ports/IFindAllLeagueSeasonsByLeagueIdUseCase';

export interface ILeagueSeasonContainer {
  findAllLeagueSeasonsByLeagueIdUseCase: IFindAllLeagueSeasonsByLeagueIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
