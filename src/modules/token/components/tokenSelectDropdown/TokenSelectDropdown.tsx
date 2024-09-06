import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import classNames from 'classnames';
import DropdownArrow from '~shared/assets/svgs/dropdownArrow.svg';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassModal } from '~shared/components/passModal/PassModal';
import { PassText } from '~shared/components/passText/PassText';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { truncateText } from '~shared/utils/helpers';
import { useNetworksMap } from '~shared/utils/hooks/useNetworksMap';
import { Token } from '~token/connectivity/token/token';
import { useTokens } from '~token/connectivity/token/useTokens';
import { useCurrencyConverter } from '~token/utils/hooks/useCurrencyConverter';

import { TokenIcon } from '../tokenIcon/TokenIcon';
import { TokenRow } from '../tokenRow/TokenRow';

export function TokenSelectDropdown({
  selectedToken,
  onUseMax,
  onSelectToken,
  walletAddress,
}: TokenSelectDropdownProps) {
  const [isTokenSelectVisible, setIsTokenSelectVisible] = useState(false);
  const tokenListResponse = useTokens({
    walletAddress,
  });
  const networks = useNetworksMap();
  const tokens = tokenListResponse.data?.data?.tokens || [];

  const { convertCryptoToFiat } = useCurrencyConverter({
    tokenSymbols: tokens.map(({ symbol }) => symbol) || [],
  });

  const handleTokenSelect = (token: Token) => {
    onSelectToken?.(token);
    setIsTokenSelectVisible(false);
  };

  useEffect(() => {
    if (!selectedToken && tokens.length > 0) onSelectToken?.(tokens[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens.length]);

  return (
    <>
      <PassModal
        isVisible={isTokenSelectVisible}
        onClose={() => setIsTokenSelectVisible(false)}
        headerText="Choose Token"
        className="max-h-[60%] px-2"
      >
        <ScrollView className="py-4">
          {tokens?.map((token, index) => (
            <TokenRow
              noDivider
              fiatBalance={
                convertCryptoToFiat(
                  +token.balance,
                  selectedToken?.symbol || ''
                ) ?? 0
              }
              networks={networks}
              onPress={() => handleTokenSelect(token)}
              key={index}
              tokenData={token}
              className={classNames('rounded-xl px-4', {
                'bg-lightBlue': selectedToken?.symbol === token.symbol,
              })}
            />
          ))}
        </ScrollView>
      </PassModal>
      <View className="w-full flex-row items-center justify-between border border-transparent border-b-borderColor px-4 py-2">
        <TouchableOpacity
          className="flex-row items-center gap-x-2"
          onPress={() => setIsTokenSelectVisible(true)}
        >
          {selectedToken && (
            <TokenIcon
              networks={[networks[selectedToken.networkId]]}
              token={selectedToken}
            />
          )}
          <View>
            <PassText className="font-bold color-primary">
              {truncateText(selectedToken?.name, 25)}{' '}
              <DropdownArrow className="color-primary" />
            </PassText>
            <FiatAmount
              className="font-normal text-textUnfocused"
              currency={DEFAULT_FIAT_CURRENCY}
              amount={
                convertCryptoToFiat(
                  +(selectedToken?.balance || 0),
                  selectedToken?.symbol || ''
                ) || 0
              }
            />
          </View>
        </TouchableOpacity>
        <View>
          <PassButton className="pr-0" onPress={onUseMax}>
            <PassText className="font-bold color-primary">Use Max</PassText>
          </PassButton>
        </View>
      </View>
    </>
  );
}

interface TokenSelectDropdownProps {
  selectedToken?: Token | null;
  onUseMax: () => void;
  onSelectToken: (token: Token) => void;
  walletAddress: string;
}
