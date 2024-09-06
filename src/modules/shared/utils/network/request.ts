import axios, { AxiosRequestHeaders } from 'axios';
import { useCommonStore } from '~src/modules/shared/state/common/store';

import {
  ApiMethods,
  ClientRequestConfig,
  RequestPropertyValue,
} from '../../interfaces/network.interface';
import { API_URL } from './config';
import {
  getFormattedHttpReqError,
  insertParamsValueInUrl,
} from './connectivityUtils';
import HttpApiCallError from './HttpApiCallError';

export function request<
  Req extends Record<string, RequestPropertyValue> | null,
  Resp,
>({
  config,
}: {
  config: ClientRequestConfig<Req>;
  headers?: AxiosRequestHeaders;
}) {
  const url = insertParamsValueInUrl(config.path, config.data || {});

  const { serviceAccessToken } = useCommonStore.getState();

  // @todo: refactor authorization header when authentication format has been concluded by the backend team
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(serviceAccessToken &&
      !config.skipAuth && {
        Authorization: `Bearer ${serviceAccessToken}`,
      }),
  };

  return axios
    .request<Resp>({
      url,
      baseURL: config?.baseUrl || API_URL,
      method: config.method,
      headers: { ...defaultHeaders, ...config.headers },
      responseType: 'json',
      [config.method === ApiMethods.GET ? 'params' : 'data']: config.data,
    })
    .then((jsonResponse) => jsonResponse.data as Resp)
    .catch((errorResponse) => {
      console.log('URL: ', url);
      console.log('API ERROR: ', errorResponse);
      const error = errorResponse?.response;
      const message = getFormattedHttpReqError(error);

      throw new HttpApiCallError(
        message,
        error?.status,
        error?.data,
        error?.data?.errorCode
      );
    });
}
