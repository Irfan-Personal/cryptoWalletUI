import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnablePasskeyPage } from '~authentication/screens/enablePasskeyPage/EnablePasskeyPage';
import { LandingPage } from '~authentication/screens/landingPage/LandingPage';
import EmailAuthenticationFlow from '~src/layouts/EmailAuthenticationFlow';
import TabNavigation from '~src/layouts/TabNavigation';
import { composeStackScreens, useInitialScreenName } from '~src/layouts/utils';

import { useDeepLinking } from './hooks/useDeepLinking';

const RootStack = createNativeStackNavigator();

export enum RootScreens {
  LandingPage = 'LandingPage',
  TabNavigation = 'TabNavigation',
  EmailAuthenticationFlow = 'EmailAuthenticationFlow',
  EnablePasskeyPage = 'EnablePasskeyPage',
}

export const rootNavigation: StackNavigation<RootScreens>[] = [
  {
    name: RootScreens.LandingPage,
    component: LandingPage,
  },
  {
    name: RootScreens.TabNavigation,
    component: TabNavigation,
  },
  {
    name: RootScreens.EmailAuthenticationFlow,
    component: EmailAuthenticationFlow,
  },
  {
    name: RootScreens.EnablePasskeyPage,
    component: EnablePasskeyPage,
    options: { presentation: 'modal', headerTitle: '' },
  },
];

export default function RootNavigation() {
  const { screenName, isFetching } = useInitialScreenName();
  useDeepLinking(isFetching);

  if (isFetching) {
    return <ActivityIndicator />;
  }

  return (
    <RootStack.Navigator
      initialRouteName={screenName}
      screenOptions={{ headerShown: false }}
    >
      {composeStackScreens(rootNavigation)}
    </RootStack.Navigator>
  );
}
