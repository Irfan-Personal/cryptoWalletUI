import { networksFixture } from '~shared/mocks/fixtures/networks.fixture';
import {
  ReformedTransaction,
  TransactionStatus,
  TransactionType,
} from '~transaction/connectivity/transactions/transactions';

import { transformTransactionListData } from '../transaction';

const mockToken = {
  name: '',
  balance: '1232',
  contractAddress: '12',
  networkId: 1,
  iconUrl: '123',
  id: '123',
  symbol: 'as',
};

const transactions: ReformedTransaction[] = [
  {
    transactionHash: 'hashPending',
    chainId: 5,
    isFinalized: false,
    senderAddress: 'addressPending',
    fee: 0.5,
    status: TransactionStatus.pending,
    type: TransactionType.erc20Transfer,
    timestamp: new Date().toISOString(),
    network: networksFixture.networks[0],
    token: mockToken,
    fiatAmount: 0,
  },
  {
    transactionHash: 'hash1',
    chainId: 1,
    isFinalized: true,
    senderAddress: 'address1',
    fee: 0.1,
    status: TransactionStatus.confirmed,
    type: TransactionType.erc20Transfer,
    timestamp: new Date().toString(),
    network: networksFixture.networks[0],
    token: mockToken,
    fiatAmount: 0,
  },
  {
    transactionHash: 'hash1',
    chainId: 2,
    isFinalized: true,
    senderAddress: 'address1',
    fee: 0.1,
    status: TransactionStatus.confirmed,
    type: TransactionType.erc20Transfer,
    timestamp: '2023-01-01T12:00:00.000Z',
    network: networksFixture.networks[0],
    token: mockToken,
    fiatAmount: 0,
  },
  {
    transactionHash: 'hash2',
    chainId: 3,
    isFinalized: true,
    senderAddress: 'address2',
    fee: 0.2,
    status: TransactionStatus.confirmed,
    type: TransactionType.erc20Transfer,
    timestamp: '2022-12-31T12:00:00.000Z',
    network: networksFixture.networks[0],
    token: mockToken,
    fiatAmount: 0,
  },
  {
    transactionHash: 'hash2',
    chainId: 4,
    isFinalized: true,
    senderAddress: 'address2',
    fee: 0.2,
    status: TransactionStatus.confirmed,
    type: TransactionType.erc20Transfer,
    timestamp: '2022-12-31T12:00:00.000Z',
    network: networksFixture.networks[0],
    token: mockToken,
    fiatAmount: 0,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const convertCryptoToFiat = (amount: number, cryptoSymbol: string) => {
  return amount;
};

describe('transformTransactionListData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('prioritizes pending transactions, then groups by "today" and specific dates', () => {
    const expected = [
      { title: 'pending', data: [transactions[0]] },
      { title: 'today', data: [transactions[1]] },
      { title: 'January 1, 2023', data: [transactions[2]] },
      { title: 'December 31, 2022', data: [transactions[3], transactions[4]] },
    ];

    expect(
      transformTransactionListData(transactions, convertCryptoToFiat)
    ).toEqual(expected);
  });

  it('integrates new transactions with previous data gracefully', () => {
    const previousTransformedData = [
      { title: 'today', data: [transactions[2], transactions[3]] },
    ];

    const newTransactions: ReformedTransaction[] = [
      {
        transactionHash: 'hash4',
        chainId: 6,
        isFinalized: true,
        senderAddress: 'address4',
        fee: 0.4,
        status: TransactionStatus.confirmed,
        type: TransactionType.erc20Transfer,
        timestamp: '2022-12-31T12:00:00.000Z',
        network: networksFixture.networks[0],
        token: mockToken,
        fiatAmount: 0,
      },
    ];

    const expected = [
      { title: 'pending', data: [transactions[0]] },
      {
        title: 'today',
        data: [...previousTransformedData[0].data, transactions[1]],
      },
      { title: 'January 1, 2023', data: [transactions[2]] },
      {
        title: 'December 31, 2022',
        data: [transactions[3], transactions[4], newTransactions[0]],
      },
    ];

    expect(
      transformTransactionListData(
        [...transactions, ...newTransactions],
        convertCryptoToFiat,
        previousTransformedData
      )
    ).toEqual(expected);
  });
});
