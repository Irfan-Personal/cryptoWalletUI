import { DEFAULT_FIAT_CURRENCY } from '~shared/constants.ts';
import { useTokenPrice } from '~token/connectivity/tokenPrice/useTokenPrice';

export const useFiatExchangeRate = (tokenSymbol: string) => {
  const marketPriceResponse = useTokenPrice({
    targetCurrency: DEFAULT_FIAT_CURRENCY,
    inputCurrencies: '',
  });

  const tokenFiatPrices =
    marketPriceResponse.data?.data?.reduce?.(
      (result, { price, inputCurrency }) => ({
        ...result,
        [inputCurrency]: price,
      }),
      {} as Record<string, number>
    ) || {};

  return tokenFiatPrices[tokenSymbol] || 0;
};
