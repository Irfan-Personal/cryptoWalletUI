import { MetadataLists } from '~common/interfaces/network.interface.ts';

export interface MarketTokenDetailResponse {
  data: { details: MarketTokenDetail };
  meta: MetadataLists;
}

export interface MarketTokenDetailRequest {
  symbol: string;
}

export interface MarketTokenDetail {
  popularity: number;
  marketCap: number;
  dayVolume: number;
  totalSupply: number;
  circulatingSupply: number;
  tokenName: string;
  dayChangePercentage: number;
  description: string;
}
