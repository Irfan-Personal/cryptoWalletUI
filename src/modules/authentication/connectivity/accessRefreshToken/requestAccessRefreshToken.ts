import {
  ACCESS_REFRESH_TOKEN_API,
  AccessRefreshTokenResponse,
} from '~authentication/connectivity/accessRefreshToken/accessRefreshToken.d';
import { ApiMethods } from '~shared/interfaces/network.interface';
import { request } from '~shared/utils/network/request';

export const requestAccessRefreshToken = async (
  firebaseToken: string
): Promise<AccessRefreshTokenResponse> => {
  return await request({
    config: {
      path: ACCESS_REFRESH_TOKEN_API,
      method: ApiMethods.POST,
      data: { FirebaseToken: firebaseToken },
      skipAuth: true,
    },
  });
};
