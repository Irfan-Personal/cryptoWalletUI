import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosRequestHeaders } from 'axios';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum ApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface ClientRequestConfig<Req> {
  path: string;
  baseUrl?: string;
  method: ApiMethods;
  headers?: AxiosRequestHeaders;
  responseType?: 'json' | 'blob';
  data?: Req;
  skipAuth?: boolean;
}

export enum QueryTypes {
  query = 'query',
  infiniteQuery = 'infinite-query',
  mutation = 'mutation',
}

export type ServiceInterface<Req, Resp> = Omit<
  ClientRequestConfig<Req>,
  'responseType' | 'options'
> & {
  queryType?: QueryTypes;
  transform?: (req: Req, resp: Resp) => Resp;
};

export interface UseQueryServiceProps<Req, Resp> {
  service: ServiceInterface<Req, Resp>;
  requestPayload?: Req;
  queryOptions?: PartialBy<UseQueryOptions, 'queryKey'> & {
    keys: string[];
  };
}
export interface UseMutationServiceProps<Req, Resp> {
  service: ServiceInterface<Req, Resp>;
  requestPayload?: Req;
  queryOptions?: UseMutationOptions<Resp, Error, Req> & {
    keys: string[];
  };
}

export interface UseInfinityQueryServiceProps<Req, Resp> {
  service: ServiceInterface<Req, Resp>;
  requestPayload?: Req;
  queryOptions?: UseInfiniteQueryOptions & {
    keys: string[];
  };
}

export type RequestPropertyValue = any;
