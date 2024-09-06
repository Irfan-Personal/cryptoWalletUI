import { ApiMethods } from '~shared/interfaces/network.interface.ts';
import { useQueryService } from '~shared/utils/hooks/useQueryService.ts';

export const FEE_ESTIMATES_QUERY_KEYS = ['GET_FEES_ESTIMATE'];
export const FEE_ESTIMATES_API = 'transactions/fees/estimates';

export function useFeeEstimate(
  data: FeeEstimateRequest,
  option?: { enabled?: boolean }
) {
  const response = useQueryService<FeeEstimateRequest, FeeEstimateResponse>({
    service: {
      path: FEE_ESTIMATES_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: FEE_ESTIMATES_QUERY_KEYS, enabled: option?.enabled },
  });

  return {
    ...response,
    feeEstimate: response.data?.data?.feeEstimates?.userOpCost || 0,
    symbol: response.data?.data?.feeEstimates?.symbol,
  };
}
