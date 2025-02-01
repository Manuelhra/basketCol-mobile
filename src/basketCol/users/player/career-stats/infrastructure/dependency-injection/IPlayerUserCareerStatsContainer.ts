import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { IFindCareerStatsByPlayerUserIdUseCase } from '../../application/use-cases/ports/IFindCareerStatsByPlayerUserIdUseCase';

export interface IPlayerUserCareerStatsContainer {
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
  findCareerStatsByPlayerUserIdUseCase: IFindCareerStatsByPlayerUserIdUseCase;
}
