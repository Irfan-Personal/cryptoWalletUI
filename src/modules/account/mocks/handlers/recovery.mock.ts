import { rest } from 'msw';
import { PHONE_NUMBERS_API } from '~account/connectivity/userProfile/useRecoveryPhoneNumbers';

import { recoveryPhoneNumbersFixture } from '../fixtures/recovery.fixture';

export const mockRecoveryPhoneNumbers = rest.get(
  `*/${PHONE_NUMBERS_API}`,
  (_, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.json({
        offset: 0,
        data: recoveryPhoneNumbersFixture,
        count: recoveryPhoneNumbersFixture.length,
        total: recoveryPhoneNumbersFixture.length,
      })
    );
  }
);
