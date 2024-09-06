import { ApiMethods } from '~shared/interfaces/network.interface.ts';
import { useQueryService } from '~shared/utils/hooks/useQueryService.ts';

export const WALLET_QUERY_KEYS = ['GET_WALLET_LIST'];
export const WALLET_API = '/wallets';

export function useWallets() {
  const results = useQueryService<WalletRequest, WalletResponse>({
    service: {
      path: WALLET_API,
      method: ApiMethods.GET,
    },
    queryOptions: { keys: WALLET_QUERY_KEYS },
  });

  return {
    wallets: results.data?.data?.wallets || [],
    ...results,
  };
}
