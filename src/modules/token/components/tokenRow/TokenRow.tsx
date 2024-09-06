import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import classNames from 'classnames';
import { CryptoAmount } from '~shared/components/cryptoAmount/CryptoAmount';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassText } from '~shared/components/passText/PassText';
import { BlockchainNetwork } from '~shared/connectivity/network/network.d';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants.ts';
import { truncateText } from '~shared/utils/helpers';
import { TokenIcon } from '~token/components/tokenIcon/TokenIcon';
import { Token } from '~token/connectivity/token/token';

export function TokenRow({
  tokenData,
  onPress,
  networks,
  className,
  noDivider,
  fiatBalance,
}: TokenRowProps) {
  const { name, symbol, balance } = tokenData;

  return (
    <TouchableOpacity
      onPress={() => onPress(tokenData)}
      className={classNames(
        'flex w-full flex-row items-center gap-x-3',
        className
      )}
    >
      <TokenIcon
        className={'mr-3'}
        networks={[networks[tokenData.networkId]]}
        token={tokenData}
      />
      <View
        className={classNames(
          'flex flex-1 flex-row items-center justify-between  py-5',
          { 'border-b border-borderColor': !noDivider }
        )}
      >
        <PassText className="text-lg font-semibold text-headingText">
          {name}
        </PassText>
        <View className="flex items-end">
          <FiatAmount
            className="text-lg font-semibold"
            amount={fiatBalance}
            currency={DEFAULT_FIAT_CURRENCY}
          />
          <CryptoAmount
            className="text-sm font-normal text-textUnfocused"
            amount={balance}
            tokenSymbol={truncateText(symbol, 20)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface TokenRowProps {
  onPress: (token: Token) => void;
  fiatBalance: number;
  networks: Record<number, BlockchainNetwork>;
  tokenData: Token;
  className?: string;
  noDivider?: boolean;
}
