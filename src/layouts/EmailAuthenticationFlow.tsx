import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmailAuthenticationPage } from '~authentication/screens/emailAuthentication/EmailAuthentication';
import { EmailConfirmation } from '~authentication/screens/emailConfirmation/EmailConfirmation';

import { composeStackScreens } from './utils';

const Stack = createNativeStackNavigator();

export enum EmailAuthenticationScreens {
  EmailAuthenticationPage = 'EmailAuthenticationPage',
  EmailConfirmation = 'EmailConfirmation',
}

export const emailAuthenticationNavigation: StackNavigation<EmailAuthenticationScreens>[] =
  [
    {
      name: EmailAuthenticationScreens.EmailAuthenticationPage,
      component: EmailAuthenticationPage,
    },
    {
      name: EmailAuthenticationScreens.EmailConfirmation,
      component: EmailConfirmation,
    },
  ];

export default function EmailAuthenticationFlow() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {composeStackScreens(emailAuthenticationNavigation)}
    </Stack.Navigator>
  );
}
