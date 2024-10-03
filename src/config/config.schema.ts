import * as Yup from 'yup';

export const configSchema = Yup.object().shape({
  env: Yup.string()
    .required('Environment is required'),
  apis: Yup.object().shape({
    basketCol: Yup.object().shape({
      url: Yup.string()
        .url('Must be a valid URL')
        .required('API URL is required'),
      version: Yup.string().required('API version is required'),
    }).required('Basketcol API configuration is required'),
  }).required('APIs configuration is required'),
});
