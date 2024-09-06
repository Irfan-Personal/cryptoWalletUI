import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataRenderer } from '~shared/components/dataRenderer/DataRenderer';
import { ExpandingSafeAreaView } from '~shared/components/expandingSafeAreaView/ExpandingSafeAreaView';
import { PassText } from '~shared/components/passText/PassText';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { isEmpty } from '~shared/utils/helpers';
import { useCurrencyConverter } from '~token/utils/hooks/useCurrencyConverter';
import ActivityListPlaceholder from '~transaction/components/activityListPlaceholder/ActivityListPlaceholder';
import { NoTransactionSection } from '~transaction/components/noTransactionSection/NoTransactionSection';
import { TransactionListing } from '~transaction/components/transactionListing/TransactionListing';
import { useTransactions } from '~transaction/connectivity/transactions/useTransactions';
import { transformTransactionListData } from '~transaction/utils/transaction';

export function TransactionsScreen() {
  const { t } = useTranslation();
  const { transactions, ...transactionsQuery } = useTransactions();

  const tokenSymbols = transactions.map(
    (transaction) => transaction.token.symbol
  );
  const { convertCryptoToFiat, ...currencyConverter } = useCurrencyConverter({
    tokenSymbols,
    targetCurrency: DEFAULT_FIAT_CURRENCY,
  });
  const transformedData = transformTransactionListData(
    transactions,
    convertCryptoToFiat
  );

  const retry = () => {
    transactionsQuery.refetch();
    currencyConverter.refetch();
  };

  return (
    <ExpandingSafeAreaView className="bg-white">
      <PassText className="text-center text-lg font-bold">
        {t('transaction.title')}
      </PassText>
      <DataRenderer
        data={{ transactions: transformedData }}
        fallback={ActivityListPlaceholder}
        isDataEmpty={isEmpty(transformedData)}
        RenderComponent={TransactionListing}
        NoDataRenderComponent={NoTransactionSection}
        loading={transactionsQuery.isLoading || currencyConverter.isLoading}
        hasError={transactionsQuery.isError || currencyConverter.isEror}
        onRetry={retry}
      />
    </ExpandingSafeAreaView>
  );
}
