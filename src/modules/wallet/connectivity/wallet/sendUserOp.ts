import { ApiMethods } from '~shared/interfaces/network.interface';
import { request } from '~shared/utils/network/request';

const SEND_USER_OP_API = '/sendUserOp';

export const sendUserOp = async (data: SendUserOpRequest): Promise<null> => {
  return await request({
    config: {
      path: SEND_USER_OP_API,
      method: ApiMethods.POST,
      data,
    },
  });
};
