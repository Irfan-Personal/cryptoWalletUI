import { MetadataLists } from './network.interface';

export const NETWORK_API = 'networks/constants';

export interface BlockchainNetwork {
  id: number;
  name: string;
  networkIconUrl: string;
}

export interface NetworksResponse {
  data: { networks: BlockchainNetwork[] };
  meta: MetadataLists;
}
