import { rest } from 'msw';
import { NETWORK_API } from '~shared/connectivity/network/network.d';

import { networksFixture } from '../fixtures/networks.fixture';

export const mockChains = rest.get(`*/${NETWORK_API}`, (_, resp, ctx) => {
  return resp(
    ctx.status(200),
    ctx.json({
      data: networksFixture,
      offset: 0,
      count: networksFixture.networks.length,
      total: networksFixture.networks.length,
    })
  );
});
