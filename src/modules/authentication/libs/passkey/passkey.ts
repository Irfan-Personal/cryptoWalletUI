import { TurnkeyClient } from '@turnkey/http';
import {
  createPasskey,
  PasskeyStamper,
  TurnkeyAuthenticatorParams,
} from '@turnkey/react-native-passkey-stamper';
import { TSignRawPayloadBody } from 'node_modules/@turnkey/http/dist/__generated__/services/coordinator/public/v1/public_api.fetcher';

const relayerPartyId = 'pass.app';

export async function createPassKey({
  userId,
  name,
  displayName,
}: {
  userId: string;
  name: string;
  displayName: string;
}): Promise<TurnkeyAuthenticatorParams> {
  const config = {
    rp: {
      id: relayerPartyId,
      name: 'Pass wallet',
    },
    user: {
      id: userId,
      name: name,
      displayName: displayName,
    },
    authenticatorName: 'End-User Passkey',
  };

  return await createPasskey(config);
}

export async function stampUserOp(args: {
  userOpHash: string;
  walletAddress: string;
  subOrgId: string;
}) {
  const stamper = new PasskeyStamper({
    rpId: relayerPartyId,
  });

  const turnkeyClient = new TurnkeyClient(
    { baseUrl: 'https://api.turnkey.com' },
    stamper
  );

  const { subOrgId, walletAddress, userOpHash } = args;

  const rawPayloadBodyToSign = {
    type: 'ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2',
    timestampMs: String(Date.now()),
    organizationId: subOrgId,
    parameters: {
      signWith: walletAddress,
      payload: userOpHash,
      encoding: 'PAYLOAD_ENCODING_HEXADECIMAL',
      hashFunction: 'HASH_FUNCTION_NO_OP',
    },
  } as TSignRawPayloadBody;

  return turnkeyClient.signRawPayload(rawPayloadBodyToSign);
}
