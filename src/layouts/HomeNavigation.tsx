import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TokenDetailsScreen } from '~token/screens/tokenDetailsScreen/TokenDetailsScreen';
import { HomeScreen } from '~wallet/screens/homeScreen/HomeScreen';
import { ReceiveScreen } from '~wallet/screens/receiveScreen/ReceiveScreen';
import { SendScreen } from '~wallet/screens/sendScreen/SendScreen';
import { SendSuccessScreen } from '~wallet/screens/sendSuccessScreen/SendSuccessScreen';

import { composeStackScreens } from './utils';

const Stack = createNativeStackNavigator();

export enum HomeScreens {
  Home = 'Home',
  TokenDetails = 'TokenDetails',
  Send = 'Send',
  Receive = 'Receive',
  SendSuccess = 'SendSuccess',
}

export const homeNavigation: StackNavigation<HomeScreens>[] = [
  {
    name: HomeScreens.Home,
    component: HomeScreen,
  },
  {
    name: HomeScreens.TokenDetails,
    component: TokenDetailsScreen,
    options: { presentation: 'modal' },
  },
  {
    name: HomeScreens.Send,
    component: SendScreen,
    options: { presentation: 'modal' },
  },
  {
    name: HomeScreens.Receive,
    component: ReceiveScreen,
    options: { presentation: 'modal' },
  },
  {
    name: HomeScreens.SendSuccess,
    component: SendSuccessScreen,
    options: { presentation: 'modal' },
  },
];

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={HomeScreens.Home}
      screenOptions={{ headerShown: false }}
    >
      {composeStackScreens(homeNavigation)}
    </Stack.Navigator>
  );
}
