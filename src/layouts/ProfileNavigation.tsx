import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreenContainer } from '~account/screens/profileScreen/ProfileScreenContainer';
import { SecurityScreen } from '~account/screens/securityScreen/SecurityScreen';

import RecoveryNavigation from './RecoveryNavigation';
import { composeStackScreens } from './utils';

const Stack = createNativeStackNavigator();

export enum ProfileScreens {
  SecurityScreen = 'SecurityScreen',
  ProfileScreen = 'ProfileScreen',
  ManageRecoveryFlow = 'ManageRecoveryFlow',
}

export const profileNavigation: StackNavigation<ProfileScreens>[] = [
  {
    name: ProfileScreens.ProfileScreen,
    component: ProfileScreenContainer,
  },
  {
    name: ProfileScreens.SecurityScreen,
    component: SecurityScreen,
  },
  {
    name: ProfileScreens.ManageRecoveryFlow,
    component: RecoveryNavigation,
    options: { presentation: 'modal' },
  },
];

export default function ProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={ProfileScreens.ProfileScreen}
      screenOptions={{ headerShown: false }}
    >
      {composeStackScreens(profileNavigation)}
    </Stack.Navigator>
  );
}
