import { rest } from 'msw';
import { WALLET_API } from '~wallet/connectivity/wallet/useWallets';

import { blocksFixture } from '../fixtures/walletDetails.fixture';

export const mockBlocks = rest.get(`*/${WALLET_API}`, (_, resp, ctx) => {
  return resp(
    ctx.status(200),
    ctx.json({
      data: blocksFixture,
      offset: 0,
      count: 0,
      total: 0,
    })
  );
});
