import { MetadataLists } from '~src/modules/shared/interfaces/network.interface';

export interface TokenPrice {
  inputCurrency: string;
  targetCurrency: string;
  price: number;
}

export interface TokenPriceResponse {
  data: TokenPrice[];
  meta: MetadataLists;
}

export interface TokenPriceRequest {
  inputCurrencies: string;
  targetCurrency: string;
}
