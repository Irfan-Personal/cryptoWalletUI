import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '~transaction/connectivity/transactions/transactions.d.ts';

export const transactionDetailMock: Transaction = {
  chainId: 80001,
  isFinalized: true,
  contractAddress: '0x0c86a754a29714c4fe9c6f1359fa7099ed174c0b',
  senderAddress: '0xabcdef1234567890abcdef1234567890abcdef1234',
  receiverAddress: '0x1234567890abcdef1234567890abcdef1234567890',
  fee: 5.0,
  amount: '503',
  status: TransactionStatus.confirmed,
  timestamp: '2024-01-02T11:32:00Z',
  transactionHash: '0x1234',
  type: TransactionType.erc20Transfer,
};

export const transactionsFixtures = [
  { ...transactionDetailMock, timestamp: new Date().toISOString() },
  {
    ...transactionDetailMock,
    amount: '53',
    status: TransactionStatus.failed,
    transactionHash: '0x12345',
  },
  {
    ...transactionDetailMock,
    amount: '38718',
    status: TransactionStatus.pending,
    isFinalized: false,
    transactionHash: '0x1134',
  },
  {
    ...transactionDetailMock,
    amount: '38718',
    transactionHash: '0x1134',
  },
  {
    ...transactionDetailMock,
    amount: '934',
    type: TransactionType.nativeTokenTransfer,
    transactionHash: '0x5234',
  },
];
