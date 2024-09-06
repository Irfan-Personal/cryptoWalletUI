import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';
import {
  MarketTokenDetailRequest,
  MarketTokenDetailResponse,
} from '~token/connectivity/marketToken/marketToken';

export const MARKET_TOKEN_QUERY_KEY = ['MARKET_TOKEN_QUERY_KEY'];
export const MARKET_TOKEN_API = 'market/tokens';

export function useMarketToken(data: MarketTokenDetailRequest) {
  return useQueryService<MarketTokenDetailRequest, MarketTokenDetailResponse>({
    service: {
      path: MARKET_TOKEN_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: MARKET_TOKEN_QUERY_KEY },
  });
}
