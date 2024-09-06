import {
  REGISTER_PASSKEY_API,
  RegisterPasskeyRequest,
  RegisterPasskeyResponse,
} from '~authentication/connectivity/registerPasskey/registerPasskey';
import { ApiMethods } from '~shared/interfaces/network.interface';
import { request } from '~shared/utils/network/request';

export const requestRegisterPasskey = async ({
  attestation,
  challenge,
}: RegisterPasskeyRequest): Promise<RegisterPasskeyResponse> => {
  return await request({
    config: {
      path: REGISTER_PASSKEY_API,
      method: ApiMethods.POST,
      data: {
        attestation,
        challenge,
      },
    },
  });
};
