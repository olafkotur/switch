import { IRequestHeaders, IRequestOptions } from '../typings/request';
import * as _ from 'lodash';
import { IResponse } from '../typings/response';
import { StorageService } from './storage';
import { ITokenData } from '../typings/data';
import { config } from '../config';

export const RequestService = {
  /**
   * Performs a get request on the provided url.
   * @param url - request url
   * @param headers - request headers
   */
  get: async (
    url: string,
    headers: IRequestHeaders = {},
  ): Promise<IResponse> => {
    return await RequestService.requestR({
      url,
      headers,
      method: 'get',
    });
  },

  /**
   * Performs a post request on the provided url.
   * @param url - request url
   * @param headers - request headers
   */
  post: async (
    url: string,
    body: object = {},
    headers: IRequestHeaders = {},
  ): Promise<IResponse> => {
    return await RequestService.requestR({
      url,
      headers,
      method: 'post',
      body: JSON.stringify(body),
    });
  },

  /**
   * Executes the request with given options.
   * @param options - request options
   * @param jwtTokens - jwt tokens
   */
  request: async (
    options: IRequestOptions,
    jwtTokens: ITokenData,
  ): Promise<IResponse> => {
    return await new Promise(async (resolve, reject) => {
      try {
        fetch(options.url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${jwtTokens.accessToken}`,
            'Content-Type': 'application/json',
          },
        }).then(async (v) =>
          resolve({ result: await v.json(), headers: v.headers }),
        );
      } catch (e) {
        reject(new Error(`RequestService:request :: ${e}`));
      }
    });
  },

  /**
   * Recursively executes the request with given options.
   * @param options - request options
   * @param attempt - number of previous attempts
   */
  requestR: async (
    options: IRequestOptions,
    attempt = 0,
  ): Promise<IResponse> => {
    const jwtTokens = (await StorageService.get('jwtTokens')) as ITokenData;
    const response = await RequestService.request(options, jwtTokens);
    return RequestService.proxy(response, jwtTokens, options, attempt);
  },

  /**
   * Request proxy, used to handle common actions for all outgoing requests.
   * @param response - request response
   * @param jwtTokens - jwt tokens
   * @param options - request options
   * @param attempt - number of previous attempts
   */
  proxy: async (
    response: IResponse,
    jwtTokens: ITokenData,
    options: IRequestOptions,
    attempt: number,
  ): Promise<IResponse> => {
    if (response.result.code === 401 && attempt < 1) {
      const refreshResponse = await RequestService.request(
        {
          method: 'post',
          url: `${config.apiUrl}/api/user/refresh`,
          body: JSON.stringify({ refreshToken: jwtTokens.refreshToken }),
        },
        jwtTokens,
      );

      // try again with new tokens
      if (refreshResponse.result.code === 200) {
        const newTokens = refreshResponse.result.data as ITokenData;
        await StorageService.set('jwtTokens', newTokens);
        return RequestService.requestR(options, attempt + 1);
      }
    }

    return response;
  },

  /**
   * Build query string.
   * @param query - query paramters
   */
  queryString: (query: object): string => {
    return _.entries(query)
      .map((v) => `${v[0]}=${v[1]}`)
      .join('&');
  },

  /**
   * Ensures all fields are provided.
   * @param fields - fields to be checked
   */
  requiredFields: (fields: string[]): boolean => {
    const missing = fields.map((v) => !v);
    return !missing.length;
  },
};
