import { useMutation } from '@tanstack/react-query';
import {
  RequestPropertyValue,
  UseMutationServiceProps,
} from '~src/modules/shared/interfaces/network.interface';
import { request } from '~shared/utils/network/request';

export function useMutationService<
  Req extends Record<string, RequestPropertyValue>,
  Resp extends Record<string, RequestPropertyValue>,
>(props: UseMutationServiceProps<Req, Resp>) {
  const { service, queryOptions, requestPayload } = props;
  const { data = {} as Record<string, RequestPropertyValue> } = service;
  const payload = data;
  const { keys = [], ...rest } = queryOptions || {};

  const normalizedPayload = Object.keys(payload).reduce(
    (result: typeof payload, key: string) => {
      if (payload[key]) result[key] = payload[key];

      return result;
    },
    {}
  ) as Req;

  service.data = normalizedPayload;

  return useMutation<Resp, Error, Req>({
    mutationKey: [service, ...keys],
    mutationFn: async (req) =>
      request<Req, Resp>({
        config: {
          ...service,
          data: { ...service.data, ...requestPayload, ...req } as Req,
        },
      }),
    ...rest,
  });
}
