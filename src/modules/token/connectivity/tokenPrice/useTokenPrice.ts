import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';
import {
  TokenPriceRequest,
  TokenPriceResponse,
} from '~token/connectivity/tokenPrice/tokenPrice.d';

export const TOKEN_PRICE_QUERY_KEY = ['TOKEN_PRICE_QUERY_KEY'];
export const PRICE_HISTORY_TOKEN_API = 'market/prices/latest';

export function useTokenPrice(data: Partial<TokenPriceRequest>) {
  return useQueryService<Partial<TokenPriceRequest>, TokenPriceResponse>({
    service: {
      path: PRICE_HISTORY_TOKEN_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: {
      keys: TOKEN_PRICE_QUERY_KEY,
      enabled: !!(data.inputCurrencies && data.targetCurrency),
    },
  });
}
