import React from 'react';
import { TextProps, View } from 'react-native';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';
import { viewAmountInCrypto } from '~shared/utils/helpers/currencyFormatter';

export function CryptoAmount({
  amount,
  tokenSymbol,
  noFormatting,
  amountClassName,
  symbolClassName,
  ...restProps
}: FiatViewerProps) {
  return (
    <View {...restProps} className="flex-row gap-x-1">
      <PassText className={classNames(amountClassName, restProps.className)}>
        {noFormatting ? amount : viewAmountInCrypto(amount)}
      </PassText>
      <PassText className={classNames(symbolClassName, restProps.className)}>
        {tokenSymbol}
      </PassText>
    </View>
  );
}

interface FiatViewerProps extends TextProps {
  tokenSymbol?: string;
  amount: number | string;
  amountClassName?: string;
  symbolClassName?: string;
  noFormatting?: boolean;
}
