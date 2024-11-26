import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { IGetPlayerUserAttributeCategoriesUseCase } from '../../application/use-cases/ports/IGetPlayerUserAttributeCategoriesUseCase';

export interface IPlayerUserAttributesContainer {
  getPlayerUserAttributeCategoriesUseCase: IGetPlayerUserAttributeCategoriesUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
