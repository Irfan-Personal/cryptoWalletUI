import { FiatCurrency } from '~shared/constants';

export enum PriceDurations {
  oneDay = '1D',
  sevenDays = '7D',
  oneMonth = '1M',
  oneYear = '1Y',
  all = 'ALL',
}

export interface PriceHistoryTokenRequest {
  duration: PriceDurations;
  fiatCurrency: FiatCurrency;
  tokenSymbol: string;
}

export interface PriceHistoryToken {
  price: string;
  timestamp: string;
}

export interface PriceHistoryTokenResponse {
  data: { history: PriceHistoryToken[] };
}
