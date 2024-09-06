import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReformedTransaction } from '~transaction/connectivity/transactions/transactions';
import { TransactionDetailsScreen } from '~transaction/screens/transactionDetailsScreen/TransactionDetailsScreen.tsx';
import { TransactionsScreen } from '~transaction/screens/transactionsScreen/TransactionsScreen.tsx';

import { composeStackScreens } from './utils';

const Stack = createNativeStackNavigator();

export type TransactionNavigationParamList = {
  [TransactionNavigationScreens.Transactions]: undefined;
  [TransactionNavigationScreens.TransactionDetails]: {
    transaction: ReformedTransaction;
  };
};

export enum TransactionNavigationScreens {
  Transactions = 'Transactions',
  TransactionDetails = 'TransactionDetails',
}

export const TransactionsNavigation: StackNavigation<TransactionNavigationScreens>[] =
  [
    {
      name: TransactionNavigationScreens.Transactions,
      component: TransactionsScreen,
    },
    {
      name: TransactionNavigationScreens.TransactionDetails,
      component: TransactionDetailsScreen,
    },
  ];

export default function TransactionNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={TransactionNavigationScreens.Transactions}
      screenOptions={{ headerShown: false }}
    >
      {composeStackScreens(TransactionsNavigation)}
    </Stack.Navigator>
  );
}
