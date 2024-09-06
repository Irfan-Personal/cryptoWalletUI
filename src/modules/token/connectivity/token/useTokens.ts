import { UseQueryOptions } from '@tanstack/react-query';
import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';
import { TokensRequest, TokensResponse } from '~token/connectivity/token/token';

export const TOKENS_QUERY_KEY = ['TOKENS_QUERY_KEY'];
export const TOKENS_API = 'wallets/tokens';

export function useTokens(
  data: TokensRequest,
  options?: Partial<UseQueryOptions>
) {
  return useQueryService<TokensRequest, TokensResponse>({
    service: {
      path: TOKENS_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: TOKENS_QUERY_KEY, ...options },
  });
}
