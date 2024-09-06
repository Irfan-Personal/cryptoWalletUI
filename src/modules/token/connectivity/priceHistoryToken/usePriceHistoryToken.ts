import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';
import {
  PriceHistoryTokenRequest,
  PriceHistoryTokenResponse,
} from '~token/connectivity/priceHistoryToken/priceHistoryToken';

export const PRICE_HISTORY_TOKEN = ['PRICE_HISTORY_TOKEN'];
export const PRICE_HISTORY_TOKEN_API = 'market/prices/history';

export function usePriceHistoryToken(data: PriceHistoryTokenRequest) {
  return useQueryService<PriceHistoryTokenRequest, PriceHistoryTokenResponse>({
    service: {
      path: PRICE_HISTORY_TOKEN_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: PRICE_HISTORY_TOKEN },
  });
}
