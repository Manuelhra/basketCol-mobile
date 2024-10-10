import { DomainError, Either, Result } from '@basketcol/domain';

import { IValidateAndRefreshAuthenticationTokenUseCase } from './ports/IValidateAndRefreshAuthenticationTokenUseCase';
import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';
import { IErrorDetail } from '../../../shared/application/http/ports/IErrorApiResponse';

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
      return this.#handleHttpError(errorResponseInfo);
    }

    const { data: { newAuthenticationToken } } = httpResult.right();
    await this.#authenticationTokenStorage.setStoreAuthenticationToken(newAuthenticationToken);
    return Either.right(null);
  }

  #handleHttpError(errorResponseInfo: { type: string; error?: IErrorDetail; errors?: IErrorDetail[] }): Result<{ newAuthenticationToken: string; }> {
    if (errorResponseInfo.type === 'single' && errorResponseInfo.error) {
      const domainError = DomainError.createSingle(errorResponseInfo.error.name, errorResponseInfo.error.details);
      return Either.left({ type: 'single', error: domainError });
    }

    if (errorResponseInfo.type === 'multiple' && errorResponseInfo.errors) {
      const domainErrors = this.#parseMultipleErrors(errorResponseInfo.errors);
      return Either.left({ type: 'multiple', errors: domainErrors });
    }

    return Either.left({ type: 'single', error: DomainError.createSingle('UnknownError', 'An unknown error occurred') });
  }

  #parseMultipleErrors(errors: IErrorDetail[]): DomainError[] {
    return errors.map((error) => DomainError.createSingle(error.name, error.details, error.field));
  }
}
