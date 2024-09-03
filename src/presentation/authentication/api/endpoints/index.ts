import { IAuthenticationEndpoints } from './IAuthenticationEndpoints';

export const authenticationEndpoints: IAuthenticationEndpoints = {
  login: {
    method: 'post',
    url: '/login',
  },
};
