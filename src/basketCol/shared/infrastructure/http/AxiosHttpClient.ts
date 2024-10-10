import { Either, HttpStatus } from '@basketcol/domain';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { IHttpClient } from '../../application/http/ports/IHttpClient';
import { IErrorApiResponse, IErrorDetail } from '../../application/http/ports/IErrorApiResponse';
import { ISuccessApiResponse } from '../../application/http/ports/ISuccessApiResponse';
import { IApiResponse } from '../../application/http/ports/IApiResponse';

type Dependencies = {
  configuration: AxiosRequestConfig;
};

export abstract class AxiosHttpClient implements IHttpClient {
  protected readonly axiosInstance: AxiosInstance;

  protected constructor(dependencies: Dependencies) {
    this.axiosInstance = axios.create(dependencies.configuration);
  }

  public async get<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data, status, statusText } = await this.axiosInstance.get<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        code: status,
        message: statusText,
        data,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public async post<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data, status, statusText } = await this.axiosInstance.post<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        code: status,
        message: statusText,
        data,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public async patch<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data, status, statusText } = await this.axiosInstance.patch<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        code: status,
        message: statusText,
        data,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  public async put<Response>(url: string, options?: Record<string, unknown>): Promise<Either<IErrorApiResponse, ISuccessApiResponse<Response>>> {
    try {
      const { data, status, statusText } = await this.axiosInstance.put<Response>(url, options);

      return Either.right<IErrorApiResponse, ISuccessApiResponse<Response>>({
        code: status,
        message: statusText,
        data,
      });
    } catch (error) {
      if (isAxiosError(error) === true) {
        return this.handleAxiosError<Response>(error as AxiosError);
      }

      return this.handleUnknownError<Response>();
    }
  }

  protected handleAxiosError<Response>(error: AxiosError): Either<IErrorApiResponse, ISuccessApiResponse<Response>> {
    if (error.response !== undefined) {
      const { status, data } = error.response;
      const baseErrorResponse: IApiResponse = {
        code: status,
        message: HttpStatus.getMessage(status),
      };

      if (this.#isSingleErrorResponse(data)) {
        return Either.left<IErrorApiResponse, ISuccessApiResponse<Response>>({
          ...baseErrorResponse,
          type: 'single',
          error: this.#parseErrorDetail(data.error),
        });
      } if (this.#isMultipleErrorResponse(data)) {
        return Either.left<IErrorApiResponse, ISuccessApiResponse<Response>>({
          ...baseErrorResponse,
          type: 'multiple',
          errors: data.errors.map(this.#parseErrorDetail),
        });
      }
    }

    return Either.left<IErrorApiResponse, ISuccessApiResponse<Response>>({
      code: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus.getMessage(error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR),
      type: 'single',
      error: {
        name: 'NetworkError',
        details: error.message,
      },
    });
  }

  #isSingleErrorResponse(data: any): data is { type: 'single'; error: IErrorDetail } {
    return data.type === 'single' && data.error !== undefined;
  }

  #isMultipleErrorResponse(data: any): data is { type: 'multiple'; errors: IErrorDetail[] } {
    return data.type === 'multiple' && Array.isArray(data.errors);
  }

  #parseErrorDetail(error: any): IErrorDetail {
    return {
      field: error.field,
      name: error.name,
      details: error.details,
    };
  }

  protected handleUnknownError<Response>(): Either<IErrorApiResponse, ISuccessApiResponse<Response>> {
    return Either.left<IErrorApiResponse, ISuccessApiResponse<Response>>({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus.getMessage(HttpStatus.INTERNAL_SERVER_ERROR),
      type: 'single',
      error: {
        name: 'UnknownError',
        details: 'An unknown error has occurred',
      },
    });
  }
}
