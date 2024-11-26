import { DomainError, Either, Result } from '@basketcol/domain';

import { IValidateAndRefreshAuthenticationTokenUseCase } from './ports/IValidateAndRefreshAuthenticationTokenUseCase';
import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';
import { DomainErrorMapper } from '../../../shared/application/mappers/DomainErrorMapper';

type Dependencies = {
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class ValidateAndRefreshAuthenticationTokenUseCase implements IValidateAndRefreshAuthenticationTokenUseCase {
  readonly #basketColHttpClient: IHttpClient;

  readonly #authenticationTokenStorage: IAuthenticationTokenStorage;

  private constructor(dependencies: Dependencies) {
    this.#basketColHttpClient = dependencies.basketColHttpClient;
    this.#authenticationTokenStorage = dependencies.authenticationTokenStorage;
  }

  public static create(dependencies: Dependencies): ValidateAndRefreshAuthenticationTokenUseCase {
    return new ValidateAndRefreshAuthenticationTokenUseCase(dependencies);
  }

  public async execute(): Promise<Result<void>> {
    const getAuthenticationTokenResult = await this.#authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.#authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.#basketColHttpClient.post<{ newAuthenticationToken: string; }>('/authentication/tokens/refresh', { headers: { Authorization: `Bearer ${authenticationToken}` } });

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      this.#authenticationTokenStorage.removeAuthenticationToken();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const { data: { newAuthenticationToken } } = httpResult.right();
    await this.#authenticationTokenStorage.setStoreAuthenticationToken(newAuthenticationToken);
    return Either.right(null);
  }
}
