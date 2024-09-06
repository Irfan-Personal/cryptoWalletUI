import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoveryPhoneNumberScreen } from '~account/screens/recoveryPhoneNumberScreen/RecoveryPhoneNumberScreen';

import { composeStackScreens } from './utils';

const Stack = createNativeStackNavigator();

export enum RecoveryScreens {
  EnableRecoveryScreen = 'EnableRecoveryScreen',
}

export const recoveryNavigation: StackNavigation<RecoveryScreens>[] = [
  {
    name: RecoveryScreens.EnableRecoveryScreen,
    component: RecoveryPhoneNumberScreen,
    options: { presentation: 'modal', headerTitle: '' },
  },
];

export default function RecoveryNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={RecoveryScreens.EnableRecoveryScreen}
      screenOptions={{ headerShown: false }}
    >
      {composeStackScreens(recoveryNavigation)}
    </Stack.Navigator>
  );
}
