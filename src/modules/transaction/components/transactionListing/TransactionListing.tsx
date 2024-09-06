import React, { useCallback } from 'react';
import { SafeAreaView, SectionList, SectionListData, View } from 'react-native';
import { PassText } from '~shared/components/passText/PassText';
import { TransactionRow } from '~transaction/components/transactionRow/TransactionRow';
import {
  ReformedTransaction,
  TransactionGroup,
} from '~transaction/connectivity/transactions/transactions';

interface TransactionListingProps {
  className?: string;
  transactions: TransactionGroup[];
}

export function TransactionListing({
  className,
  transactions,
}: TransactionListingProps) {
  const renderItem = useCallback(
    ({ item }: { item: ReformedTransaction }) => (
      <TransactionRow transaction={item} />
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({
      section: { title },
    }: {
      section: SectionListData<ReformedTransaction, TransactionGroup>;
    }) => (
      <View className="mt-1 px-5 py-2">
        <PassText className="capitalize">{title}</PassText>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView className={className}>
      <SectionList
        sections={transactions}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.transactionHash}
      />
    </SafeAreaView>
  );
}
