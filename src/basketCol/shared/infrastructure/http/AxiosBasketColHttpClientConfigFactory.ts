import { AxiosRequestConfig } from 'axios';

import { appConfig } from '../../../../config';

export abstract class AxiosBasketColHttpClientConfigFactory {
  public static createConfiguration(): AxiosRequestConfig {
    const baseUrl = AxiosBasketColHttpClientConfigFactory.#getBaseUrl();

    return {
      baseURL: baseUrl,
      params: {},
      headers: AxiosBasketColHttpClientConfigFactory.#getDefaultHeaders(),
    };
  }

  static #getBaseUrl(): string {
    const { url } = appConfig.apis.basketCol;
    const { version } = appConfig.apis.basketCol;
    return `${url}/api/${version}`;
  }

  static #getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    };
  }
}
