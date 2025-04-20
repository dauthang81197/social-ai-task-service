export interface IRequestOption {
  headers?: any;
  qs?: any;
  body?: any;
}

export enum RequestMethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export enum Strategy {
  CLIENT_ID = 'x-ccp-client-id',
  CLIENT_SECRET = 'x-ccp-client-secret',
  CLIENT_DEVICE = 'x-ccp-device',
}
