import { ApiMethods } from '~src/modules/shared/interfaces/network.interface';
import { useQueryService } from '~src/modules/shared/utils/hooks/useQueryService';

export const USER_PROFILE_QUERY_KEY = ['USER_PROFILE_QUERY_KEY'];
export const USER_PROFILE_API = 'user/profile';

export function useUserProfile(args?: { isEnabled?: boolean }) {
  const useProfileQuery = useQueryService<
    UserProfileRequest,
    UserProfileResponse
  >({
    service: {
      path: USER_PROFILE_API,
      method: ApiMethods.GET,
    },
    queryOptions: { keys: USER_PROFILE_QUERY_KEY, enabled: args?.isEnabled },
  });

  return {
    ...useProfileQuery,
    userProfile: useProfileQuery.data?.data,
  };
}
