import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserProfile } from '~account/connectivity/userProfile/useUserProfile.ts';
import { useCommonStoreShallow } from '~src/modules/shared/state/common/store';

export function useInitialScreenName() {
  const { serviceRefreshToken } = useCommonStoreShallow([
    'serviceRefreshToken',
  ]);
  const { userProfile, ...userProfileQuery } = useUserProfile({
    isEnabled: !!serviceRefreshToken,
  });

  if (!userProfile || !serviceRefreshToken) {
    return {
      screenName: 'LandingPage',
      isFetching: userProfileQuery.isFetching,
    };
  }

  const screenName = userProfile.isPasskeyRegistered
    ? 'TabNavigation'
    : 'EnablePasskeyPage';

  return {
    screenName,
    isFetching: userProfileQuery.isFetching,
  };
}

export function composeStackScreens(nav: StackNavigation<string>[]) {
  const Stack = createNativeStackNavigator();

  return nav.map(({ name, component, options }) => {
    return (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    );
  });
}
