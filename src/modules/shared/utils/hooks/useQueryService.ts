import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { request } from '~shared/utils/network/request';
import {
  RequestPropertyValue,
  UseQueryServiceProps,
} from '~src/modules/shared/interfaces/network.interface';

export function useQueryService<
  Req extends Record<string, RequestPropertyValue> | null,
  Resp extends Record<string, RequestPropertyValue>,
>(props: UseQueryServiceProps<Req, Resp>): UseQueryResult<Resp> {
  const { service, queryOptions, requestPayload } = props;
  const { data = {} as Record<string, RequestPropertyValue> } = service;
  const payload = data || {};
  const { keys = [], ...rest } = queryOptions || {};

  const normalizedPayload = Object.keys(payload).reduce(
    (result: typeof payload, key: string) => {
      if (payload[key]) result[key] = payload[key];

      return result;
    },
    {}
  ) as Req;

  service.data = normalizedPayload;

  return useQuery({
    queryKey: [JSON.stringify(service), ...keys],
    queryFn: async () =>
      request<Req, Resp>({
        config: {
          ...service,
          data: { ...service.data, ...requestPayload } as Req,
        },
      }),
    ...rest,
  }) as UseQueryResult<Resp>;
}
