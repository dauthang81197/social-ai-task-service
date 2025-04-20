import axios from 'axios';

import 'dotenv/config';
import {
  IRequestOption,
  RequestMethodEnum,
  Strategy,
} from '../models/request.model';

export class Request {
  /**
   * @function _send
   * @param baseURL
   * @param url
   * @param method
   * @param options
   * @private
   */
  private static _send<T>(
    baseURL: string,
    url: string,
    method: RequestMethodEnum,
    options: IRequestOption = {},
  ) {
    if (url[0] === '/') url = url.slice(1);

    return axios.request<T>({
      baseURL: baseURL,
      url: `api/v1/${url}`,
      method: method,
      data: options.body,
      params: options.qs,
      headers: {
        [Strategy.CLIENT_SECRET]: process.env.CLIENT_SECRET,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  public static get<T>(baseURL: string, url: string, options?: IRequestOption) {
    return this._send<T>(baseURL, url, RequestMethodEnum.GET, options);
  }

  public static post<T>(
    baseURL: string,
    url: string,
    options?: IRequestOption,
  ) {
    return this._send<T>(baseURL, url, RequestMethodEnum.POST, options);
  }

  public static put<T>(baseURL: string, url: string, options?: IRequestOption) {
    return this._send<T>(baseURL, url, RequestMethodEnum.PUT, options);
  }

  public static patch<T>(
    baseURL: string,
    url: string,
    options?: IRequestOption,
  ) {
    return this._send<T>(baseURL, url, RequestMethodEnum.PATCH, options);
  }

  public static delete<T>(
    baseURL: string,
    url: string,
    options?: IRequestOption,
  ) {
    return this._send<T>(baseURL, url, RequestMethodEnum.DELETE, options);
  }
}
