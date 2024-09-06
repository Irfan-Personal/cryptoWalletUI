import React from 'react';
import { TextProps, View } from 'react-native';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';
import { CurrencySymbols, FiatCurrency } from '~shared/constants.ts';
import { viewAmountInFiat } from '~shared/utils/helpers/currencyFormatter.ts';

export function FiatAmount({
  currency,
  amount,
  noFormatting,
  amountClassName,
  symbolClassName,
  ...restProps
}: FiatViewerProps) {
  return (
    <View {...restProps} className="flex-row">
      <PassText className={classNames(symbolClassName, restProps.className)}>
        {CurrencySymbols[currency]}
      </PassText>
      <PassText className={classNames(amountClassName, restProps.className)}>
        {noFormatting ? amount : viewAmountInFiat(amount)}
      </PassText>
    </View>
  );
}

interface FiatViewerProps extends TextProps {
  currency: FiatCurrency;
  amount: number | string;
  amountClassName?: string;
  symbolClassName?: string;
  noFormatting?: boolean;
}
