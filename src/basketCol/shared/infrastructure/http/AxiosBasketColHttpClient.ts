import { Either } from '@basketcol/domain';
import { AxiosError, isAxiosError } from 'axios';

import { IAuthenticationTokenStorage } from '../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { AxiosBasketColHttpClientConfigFactory } from './AxiosBasketColHttpClientConfigFactory';
import { AxiosHttpClient } from './AxiosHttpClient';
import { IErrorApiResponse } from '../../application/http/ports/IErrorApiResponse';
import { ISuccessApiResponse } from '../../application/http/ports/ISuccessApiResponse';

type Dependencies = {
  authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class AxiosBasketColHttpClient extends AxiosHttpClient {
  readonly #authenticationTokenStorage: IAuthenticationTokenStorage;

  private constructor(dependencies: Dependencies) {
    super({
      configuration: AxiosBasketColHttpClientConfigFactory.createConfiguration(),
    });

    this.#authenticationTokenStorage = dependencies.authenticationTokenStorage;

    this.axiosInstance.interceptors.request.use(async (config) => {
      const result = await this.#authenticationTokenStorage.getAuthenticationToken();

      if (result.isRight) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${result.right()}`;
      }

      return config;
    });
  }

  public static create(dependencies: Dependencies): AxiosBasketColHttpClient {
    return new AxiosBasketColHttpClient(dependencies);
  }

  public override async get<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data } = await this.axiosInstance.get<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        ...data as ISuccessApiResponse<Response>,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public override async post<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data } = await this.axiosInstance.post<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        ...data as ISuccessApiResponse<Response>,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public override async patch<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data } = await this.axiosInstance.patch<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        ...data as ISuccessApiResponse<Response>,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public override async put<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data } = await this.axiosInstance.put<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        ...data as ISuccessApiResponse<Response>,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }
}
