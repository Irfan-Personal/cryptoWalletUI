import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';

export const PHONE_NUMBERS_QUERY_KEY = ['PHONE_NUMBERS_QUERY_KEY'];
export const PHONE_NUMBERS_API = 'account/phoneNumbers';

export function useRecoveryPhoneNumbers() {
  const queryResponse = useQueryService<
    RecoveryPhoneNumberRequest,
    RecoveryPhoneNumberResponse
  >({
    service: {
      path: PHONE_NUMBERS_API,
      method: ApiMethods.GET,
    },
    queryOptions: { keys: PHONE_NUMBERS_QUERY_KEY },
  });

  return {
    ...queryResponse,
    phoneNumbers: queryResponse.data?.data || [],
  };
}
