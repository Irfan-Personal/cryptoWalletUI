import {
  NETWORK_API,
  NetworksResponse,
} from '~shared/connectivity/network/network.d';
import { ApiMethods } from '~shared/interfaces/network.interface';
import { useQueryService } from '~shared/utils/hooks/useQueryService';

export const NETWORK_QUERY_KEY = ['NETWORK_QUERY_KEY'];

export function useNetworks() {
  return useQueryService<null, NetworksResponse>({
    service: {
      path: NETWORK_API,
      method: ApiMethods.GET,
    },
    queryOptions: { keys: NETWORK_QUERY_KEY, staleTime: 86400000 },
  });
}
