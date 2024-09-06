import { rest } from 'msw';
import { PRICE_HISTORY_TOKEN_API } from '~token/connectivity/tokenPrice/useTokenPrice.ts';

import { marketPricingFixtures } from '../fixtures/marketPricing.fixture';

export const mockMarketPricing = rest.get(
  `*/${PRICE_HISTORY_TOKEN_API}`,
  (req, resp, ctx) => {
    const inputCurrencies = req.url.searchParams.get('inputCurrencies');

    return resp(
      ctx.status(200),
      ctx.json({
        data: marketPricingFixtures.filter(
          ({ inputCurrency }) =>
            inputCurrencies?.split(',').includes(inputCurrency)
        ),
        offset: 0,
        count: marketPricingFixtures.length,
        total: marketPricingFixtures.length,
      })
    );
  }
);
