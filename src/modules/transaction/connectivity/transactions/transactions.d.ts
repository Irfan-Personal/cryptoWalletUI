import { BlockchainNetwork } from '~shared/connectivity/network/network';
import { Token } from '~token/connectivity/token/token';

export enum TransactionStatus {
  confirmed = 'confirmed',
  failed = 'failed',
  pending = 'pending',
}

export enum TransactionType {
  erc20Transfer = 'erc20_transfer',
  nativeTokenTransfer = 'native_token_transfer',
}

export interface Transaction {
  transactionHash: string;
  chainId: number;
  isFinalized: boolean;
  senderAddress: string;
  contractAddress?: string;
  receiverAddress?: string;
  amount?: string;
  fee: number;
  status: TransactionStatus;
  type: TransactionType;
  timestamp: string;
}

export interface TransactionRequest {
  status?: string;
  limit?: number;
  offset?: number;
}

export interface TransactionResponse {
  data: Transaction[];
  meta: MetadataLists;
}

export interface ReformedTransaction extends Transaction {
  network: BlockchainNetwork;
  token: Token;
  fiatAmount: number;
}

export interface TransactionGroup {
  title: string;
  data: ReformedTransaction[];
}
