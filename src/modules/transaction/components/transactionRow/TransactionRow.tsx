import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import classNames from 'classnames';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassText } from '~shared/components/passText/PassText';
import { FiatCurrency } from '~shared/constants';
import { truncateText } from '~shared/utils/helpers';
import { TransactionNavigationScreens } from '~src/layouts/TransactionNavigation';
import { TokenIcon } from '~token/components/tokenIcon/TokenIcon';
import {
  ReformedTransaction,
  TransactionStatus,
} from '~transaction/connectivity/transactions/transactions.d';

interface TransactionRowProps {
  className?: string;
  transaction: ReformedTransaction;
}

function TransactionRowComponent({
  className,
  transaction,
}: TransactionRowProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<TransactionStack>();

  const onPress = () => {
    navigation.navigate(TransactionNavigationScreens.TransactionDetails, {
      transaction,
    });
  };

  return (
    <TouchableOpacity
      className={classNames(className, {
        ['rounded-cardRadius mx-4 my-1 bg-lightBlue']: !transaction.isFinalized,
      })}
      onPress={onPress}
    >
      <View className="flex flex-row px-5">
        <View className="my-2 items-center py-3">
          <TokenIcon
            token={transaction.token}
            networks={[transaction.network]}
          />
        </View>
        <View
          className={classNames(
            'my-2 ml-3 flex flex-1 flex-row items-center border-borderColor',
            {
              'border-b': transaction.isFinalized,
            }
          )}
        >
          <View className="flex-1">
            <PassText className="text-lg font-semibold text-headingText">
              {transaction.fee
                ? t('transaction.transactionTypes.send')
                : t('transaction.transactionTypes.receive')}
            </PassText>
            {transaction.status === TransactionStatus.failed && (
              <PassText className="text-textUnfocused">
                {t('transaction.transactionStatus.failed')}
              </PassText>
            )}
          </View>
          <View className="flex items-end">
            <FiatAmount
              className="font-semibold"
              amount={transaction.fiatAmount ?? 0}
              currency={FiatCurrency.USD}
            />
            <PassText className="text-sm font-normal text-textUnfocused">
              {transaction?.amount?.toString()}{' '}
              {truncateText(transaction.token.symbol ?? '', 20)}
            </PassText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const TransactionRow = React.memo(TransactionRowComponent);
