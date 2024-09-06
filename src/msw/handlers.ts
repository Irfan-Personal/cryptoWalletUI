import * as accountMocks from '~account/mocks/handlers';
import * as sharedMocks from '~shared/mocks/handlers';
import * as transactionsMocks from '~transaction/mocks/handlers';
import * as walletMocks from '~wallet/mocks/handlers';

export default [
  ...Object.values(walletMocks),
  ...Object.values(sharedMocks),
  ...Object.values(transactionsMocks),
  ...Object.values(accountMocks),
];
