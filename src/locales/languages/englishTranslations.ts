import englishAccount from '~account/languages/en.json';
import englishAuth from '~authentication/languages/en.json';
import englishCommon from '~src/modules/shared/languages/en.json';
import englishToken from '~token/languages/en.json';
import englishTransaction from '~transaction/languages/en.json';
import englishWallet from '~wallet/languages/en.json';

export const ENGLISH_TRANSLATIONS = {
  ...englishAuth,
  ...englishCommon,
  ...englishWallet,
  ...englishAccount,
  ...englishTransaction,
  ...englishToken,
};
