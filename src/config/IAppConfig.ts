import * as Yup from 'yup';

import { configSchema } from './config.schema';

export type IAppConfig = Yup.InferType<typeof configSchema>;
