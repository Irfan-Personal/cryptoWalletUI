import { TurnkeyAuthenticatorParams } from '@turnkey/react-native-passkey-stamper';

export interface RegisterPasskeyResponse {
  data: {
    subOrgId: string;
    walletId: string;
  };
}

export const REGISTER_PASSKEY_API = 'auth/registerPasskey';

export type RegisterPasskeyRequest = Pick<
  TurnkeyAuthenticatorParams,
  'challenge' | 'attestation'
>;
