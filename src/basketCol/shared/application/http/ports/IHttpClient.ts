import { Either } from '@basketcol/domain';

import { IErrorApiResponse } from './IErrorApiResponse';
import { ISuccessApiResponse } from './ISuccessApiResponse';

export interface IHttpClient {
  get<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>>;
  post<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>>;
  patch<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>>;
  put<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>>;
}
