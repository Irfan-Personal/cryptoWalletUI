import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FULL_MONTH_DATE_FORMAT } from '~shared/utils/date';
import {
  ReformedTransaction,
  TransactionGroup,
  TransactionStatus,
} from '~transaction/connectivity/transactions/transactions.d.ts';

dayjs.extend(advancedFormat);

export const transformTransactionListData = (
  transactions: ReformedTransaction[],
  convertCryptoToFiat: (amount: number, cryptoSymbol: string) => null | number,
  previousTransformedData?: TransactionGroup[]
): TransactionGroup[] => {
  const todayStr = dayjs().format(FULL_MONTH_DATE_FORMAT);
  // Start with an empty result array or a shallow copy of the previous transformed data
  const result: TransactionGroup[] = previousTransformedData
    ? [...previousTransformedData]
    : [];
  let todayGroupAdded =
    previousTransformedData?.some((group) => group.title === 'today') ?? false;
  let pendingGroupAdded =
    previousTransformedData?.some((group) => group.title === 'pending') ??
    false;

  transactions.forEach((transaction) => {
    if (transaction.amount) {
      const fiatAmount = convertCryptoToFiat(
        Number(transaction.amount ?? '0'),
        transaction.token.symbol
      );
      if (fiatAmount) {
        transaction.fiatAmount = fiatAmount;
      }
    }
    const date = dayjs(transaction.timestamp);
    const formattedDate = date.format(FULL_MONTH_DATE_FORMAT);
    let title =
      formattedDate === todayStr
        ? 'today'
        : date.format(FULL_MONTH_DATE_FORMAT);

    if (!transaction.isFinalized && !pendingGroupAdded) {
      title = 'pending';
      result.unshift({ title, data: [transaction] }); // Adds pending transactions at the beginning
      pendingGroupAdded = true;
    } else if (!transaction.isFinalized) {
      result[0].data.push(transaction); // Adds to the existing pending group
    } else {
      // Handle 'today' transactions
      if (title === 'today' && !todayGroupAdded) {
        // If 'today' group hasn't been added, prepend or append it depending on your sorted order
        result.push({ title, data: [transaction] });
        todayGroupAdded = true;
      } else if (title === 'today') {
        // If 'today' group already exists, just add the transaction to the last group
        result[result.length - 1].data.push(transaction);
      } else {
        // For non-today transactions, check if the last group matches the title
        if (result.length > 0 && result[result.length - 1].title === title) {
          result[result.length - 1].data.push(transaction);
        } else {
          // Otherwise, add a new group
          result.push({ title, data: [transaction] });
        }
      }
    }
  });

  return result;
};
