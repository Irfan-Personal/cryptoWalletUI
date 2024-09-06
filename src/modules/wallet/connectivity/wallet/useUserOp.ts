import { UseQueryOptions } from '@tanstack/react-query';
import { ApiMethods } from '~shared/interfaces/network.interface.ts';
import { useQueryService } from '~shared/utils/hooks/useQueryService.ts';

export const USER_OP_QUERY_KEYS = ['GET_USER_OP'];
export const USER_OP_API = '/userop';

export function useUserOp(
  data: UserOpRequest,
  options?: Partial<UseQueryOptions>
) {
  return useQueryService<UserOpRequest, UserOpResponse>({
    service: {
      path: USER_OP_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: USER_OP_QUERY_KEYS, ...options },
  });
}
