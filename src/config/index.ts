import { env } from './env';
import { IAppConfig } from './IAppConfig';

export const appConfig: IAppConfig = {
  env: env.NODE_ENV,
  apis: {
    basketCol: {
      url: env.BASKETCOL_API_URL,
      version: env.BASKETCOL_API_VERSION,
    },
  },
};
