import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { useTokenPrice } from '~token/connectivity/tokenPrice/useTokenPrice';

type Props = {
  tokenSymbols: string[];
  targetCurrency?: string;
};

export const useCurrencyConverter = ({
  tokenSymbols,
  targetCurrency = DEFAULT_FIAT_CURRENCY,
}: Props) => {
  const marketPriceResponse = useTokenPrice({
    targetCurrency,
    inputCurrencies: tokenSymbols.join(','),
  });

  const marketPrices = marketPriceResponse.data?.data || [];

  const tokenFiatPrices = marketPrices.reduce(
    (result, { price, inputCurrency }) => result.set(inputCurrency, price),
    new Map()
  );

  const convertFiatToCrypto = (fiatAmount: number, cryptoSymbol: string) => {
    const cryptoPrice = tokenFiatPrices.get(cryptoSymbol);

    if (!cryptoPrice) return null;

    return fiatAmount / cryptoPrice;
  };

  const convertCryptoToFiat = (cryptoAmount: number, cryptoSymbol: string) => {
    const cryptoPrice = tokenFiatPrices.get(cryptoSymbol);

    if (!cryptoPrice) return null;

    return cryptoAmount * cryptoPrice;
  };

  return {
    convertFiatToCrypto,
    convertCryptoToFiat,
    isLoading: marketPriceResponse.isLoading,
    isEror: marketPriceResponse.isError,
    refetch: marketPriceResponse.refetch,
  };
};
