import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity, View } from 'react-native';
import { CryptoAmount } from '~shared/components/cryptoAmount/CryptoAmount';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import KeyValueItemRow from '~shared/components/keyValueItemRow/KeyValueItemRow';
import { PageWrapper } from '~shared/components/pageWrapper/PageWrapper';
import { PassText } from '~shared/components/passText/PassText';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { formatDate, FULL_DATE_LONG_FORMAT } from '~shared/utils/date';
import { truncateText } from '~shared/utils/helpers';
import {
  ReformedTransaction,
  TransactionStatus,
} from '~transaction/connectivity/transactions/transactions.d';

interface TransactionDetailsProps {
  transaction: ReformedTransaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
}) => {
  const { t } = useTranslation();

  const explorerUrl = `explorer.com/${transaction.transactionHash}`;
  const handleExplorerLinkPress = () => {
    Linking.openURL(`https://${explorerUrl}`);
  };

  return (
    <PageWrapper
      hasHeader
      headingProps={{
        backButtonText: t('shared.navigation.back'),
        title: t('transaction.transactionDetails.title'),
      }}
    >
      <View className="m-2 rounded-lg bg-white p-4">
        <View className="mb-4 flex-row items-center">
          <View className="mr-4 h-20 w-20 rounded-full border border-borderColor bg-gray-200" />
          <View>
            <PassText className="text-3xl font-bold">
              <FiatAmount
                className="text-2xl font-semibold"
                amount={Number(transaction.fiatAmount)}
                currency={DEFAULT_FIAT_CURRENCY}
              />
            </PassText>
            <CryptoAmount
              className="text-sm font-normal text-textUnfocused"
              amount={+(transaction?.amount || 0)}
              tokenSymbol={truncateText(transaction.token.symbol, 20)}
            />
            <PassText className="text-sm font-normal text-textUnfocused">
              {transaction?.amount?.toString()} {transaction.token.symbol}
            </PassText>
          </View>
        </View>
        <View className="mt-5 flex-col gap-y-4 rounded-xl bg-lightBlue p-4">
          <KeyValueItemRow
            title={t('transaction.transactionDetails.action')}
            valueClassName="font-semibold"
            value={
              transaction.fee
                ? t('transaction.transactionTypes.send')
                : t('transaction.transactionTypes.receive')
            }
          />
          <KeyValueItemRow
            title={t('transaction.transactionDetails.status')}
            value={TransactionStatus[transaction.status]}
            valueClassName="capitalize font-semibold"
          />
          <KeyValueItemRow
            title={t('transaction.transactionDetails.date')}
            valueClassName="font-semibold"
            value={formatDate(transaction.timestamp, FULL_DATE_LONG_FORMAT)}
          />
        </View>

        <View className="mt-5 rounded-xl bg-lightBlue p-4">
          {transaction.fee && (
            <KeyValueItemRow
              title={t('transaction.transactionDetails.fee')}
              value={transaction.fee}
              valueRenderer={(value) => (
                <FiatAmount
                  className="text-lg font-semibold"
                  amount={value}
                  currency={DEFAULT_FIAT_CURRENCY}
                />
              )}
            />
          )}
          <KeyValueItemRow
            title={t('transaction.transactionDetails.explorerLink')}
            value={explorerUrl}
            valueRenderer={(link) => (
              <TouchableOpacity onPress={handleExplorerLinkPress}>
                <PassText className="text-md font-bold underline">
                  {truncateText(String(link), 18)}
                </PassText>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </PageWrapper>
  );
};

export default TransactionDetails;
