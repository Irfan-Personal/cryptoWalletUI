import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { ApiMethods } from '~shared/interfaces/network.interface.ts';
import { useNetworksMap } from '~shared/utils/hooks/useNetworksMap';
import { useQueryService } from '~shared/utils/hooks/useQueryService';
import { useTokens } from '~token/connectivity/token/useTokens';
import { useTokenPrice } from '~token/connectivity/tokenPrice/useTokenPrice';
import {
  TransactionRequest,
  TransactionResponse,
} from '~transaction/connectivity/transactions/transactions';

export const TRANSACTIONS_QUERY_KEYS = ['GET_TRANSACTIONS_LIST'];
export const TRANSACTIONS_API = 'transactions';

export function useTransactions(data?: TransactionRequest) {
  const tokenListResponse = useTokens({
    walletAddress: '0xb794f5ea0ba39494ce839613fffba74279579268',
  });
  const tokens = tokenListResponse.data?.data?.tokens || [];

  const tokenIdMap = tokens.reduce((result, token) => {
    result.set(`${token.contractAddress}${token.networkId}`, token);

    return result;
  }, new Map());

  const networks = useNetworksMap();
  const marketPriceResponse = useTokenPrice({
    targetCurrency: DEFAULT_FIAT_CURRENCY,
    inputCurrencies: tokens.map(({ symbol }) => symbol).join(',') as string,
  });

  const marketPrices = marketPriceResponse.data?.data || [];

  const tokenFiatPrices = marketPrices.reduce(
    (result, { price, inputCurrency }) => result.set(inputCurrency, price),
    new Map()
  );

  const result = useQueryService<TransactionRequest, TransactionResponse>({
    service: {
      path: TRANSACTIONS_API,
      method: ApiMethods.GET,
      data,
    },
    queryOptions: { keys: TRANSACTIONS_QUERY_KEYS },
  });

  const transactions =
    result.data?.data.map((transaction) => {
      const token =
        tokenIdMap.get(
          `${transaction.contractAddress}${transaction.chainId}`
        ) ?? {};

      return {
        ...transaction,
        token,
        network: networks[transaction.chainId] ?? {},
        fiatAmount: tokenFiatPrices.get(token.symbol),
      };
    }) || [];

  return {
    transactions,
    isLoading: tokenListResponse.isLoading || marketPriceResponse.isLoading,
    isError: tokenListResponse.isError || marketPriceResponse.isError,
    error: tokenListResponse.error || marketPriceResponse.error,
    refetch: () => {
      tokenListResponse.refetch();
      marketPriceResponse.refetch();
    },
  };
}
