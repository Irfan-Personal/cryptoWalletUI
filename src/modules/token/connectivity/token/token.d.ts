import { MetadataLists } from '~common/interfaces/network.interface.ts';

export interface TokensRequest {
  walletAddress: string;
}
export interface TokensResponse {
  data: { tokens: Token[] };
  meta: MetadataLists;
}
export interface Token {
  id: string;
  contractAddress: string;
  symbol: string;
  name: string;
  iconUrl: string;
  networkId: number;
  balance: string;
}
