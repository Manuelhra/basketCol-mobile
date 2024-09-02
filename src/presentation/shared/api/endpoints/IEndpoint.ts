export interface IEndpoint {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
}
