import { rest } from 'msw';
import { TRANSACTIONS_API } from '~transaction/connectivity/transactions/useTransactions';

import { transactionsFixtures } from '../fixtures/transactions.fixture.ts';

export const mockTransactions = rest.get(
  `*/${TRANSACTIONS_API}`,
  (req, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        data: transactionsFixtures,
        meta: {
          offset: 0,
          count: transactionsFixtures.length,
          total: transactionsFixtures.length,
        },
      })
    );
  }
);
