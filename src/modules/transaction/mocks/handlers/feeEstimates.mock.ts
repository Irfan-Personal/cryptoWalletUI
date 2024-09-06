import { rest } from 'msw';
import { FEE_ESTIMATES_API } from '~transaction/connectivity/fees/useFeeEstimates';

import { feeEstimatesFixtures } from '../fixtures/feeEstimates.fixture';

export const mockBlocks = rest.get(`*/${FEE_ESTIMATES_API}`, (_, resp, ctx) => {
  return resp(
    ctx.status(200),
    ctx.json({
      data: { feeEstimates: feeEstimatesFixtures },
      meta: { timestamp: 1708973766346 },
    })
  );
});
