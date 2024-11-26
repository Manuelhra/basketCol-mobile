import { DomainError, Either, Result } from '@basketcol/domain';

import { IErrorDetail } from '../http/ports/IErrorApiResponse';

export abstract class DomainErrorMapper {
  public static execute<T>(errorResponseInfo: { type: string; error?: IErrorDetail; errors?: IErrorDetail[] }): Result<T> {
    if (errorResponseInfo.type === 'single' && errorResponseInfo.error) {
      const domainError = DomainError.createSingle(errorResponseInfo.error.name, errorResponseInfo.error.details);
      return Either.left({ type: 'single', error: domainError });
    }

    if (errorResponseInfo.type === 'multiple' && errorResponseInfo.errors) {
      const domainErrors = errorResponseInfo.errors.map((error) => DomainError.createSingle(error.name, error.details, error.field));
      return Either.left({ type: 'multiple', errors: domainErrors });
    }

    return Either.left({ type: 'single', error: DomainError.createSingle('UnknownError', 'An unknown error occurred') });
  }
}
