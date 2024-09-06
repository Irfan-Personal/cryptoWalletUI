import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  TransactionNavigationParamList,
  TransactionNavigationScreens,
} from '~src/layouts/TransactionNavigation';
import { ExpandingSafeAreaView } from '~src/modules/shared/components/expandingSafeAreaView/ExpandingSafeAreaView';
import TransactionDetails from '~transaction/components/transactionDetails/TransactionDetails';

interface TransactionDetailsProps {
  route: RouteProp<
    TransactionNavigationParamList,
    TransactionNavigationScreens.TransactionDetails
  >;
}

export function TransactionDetailsScreen({ route }: TransactionDetailsProps) {
  const { transaction } = route.params;

  return (
    <ExpandingSafeAreaView className="bg-white">
      <TransactionDetails transaction={transaction} />
    </ExpandingSafeAreaView>
  );
}
