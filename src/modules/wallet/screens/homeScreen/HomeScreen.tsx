import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import classNames from 'classnames';
import { ExpandingSafeAreaView } from '~shared/components/expandingSafeAreaView/ExpandingSafeAreaView';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { useNetworksMap } from '~shared/utils/hooks/useNetworksMap';
import { HomeScreens } from '~src/layouts/HomeNavigation';
import { TokenRow } from '~token/components/tokenRow/TokenRow';
import { Token } from '~token/connectivity/token/token';
import { useTokens } from '~token/connectivity/token/useTokens';
import { useCurrencyConverter } from '~token/utils/hooks/useCurrencyConverter';
import { WalletBalance } from '~wallet/components/walletBalance/WalletBalance';
import { useWallets } from '~wallet/connectivity/wallet/useWallets';

export function HomeScreen() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigation = useNavigation<Navigation>();
  const { t } = useTranslation();

  const tabs = [
    {
      title: t('wallet.tokens'),
      onClick: () => setTabIndex(0),
    },
    {
      title: t('wallet.collectibles'),
      onClick: () => setTabIndex(1),
    },
  ];

  const { wallets } = useWallets();

  const selectedWallet = wallets?.[0];

  const tokenListResponse = useTokens(
    { walletAddress: selectedWallet?.address },
    { enabled: !!selectedWallet?.address }
  );
  const networks = useNetworksMap();

  const tokens = tokenListResponse.data?.data?.tokens || [];

  const { convertCryptoToFiat } = useCurrencyConverter({
    tokenSymbols: tokens.map(({ symbol }) => symbol) || [],
  });

  const walletBalance = tokens.reduce(
    (result, { balance, symbol }) =>
      result + (convertCryptoToFiat(+balance, symbol) ?? 0),
    0
  );

  const handlePressToken = (token: Token) => {
    navigation.navigate(HomeScreens.TokenDetails, { token });
  };

  const handleSendToken = () => {
    navigation.navigate(HomeScreens.Send);
  };

  const handleReceiveToken = () => {
    navigation.navigate(HomeScreens.Receive);
  };

  return (
    <ExpandingSafeAreaView className="bg-white">
      <WalletBalance
        currency={DEFAULT_FIAT_CURRENCY}
        balance={walletBalance}
        onSend={handleSendToken}
        onReceive={handleReceiveToken}
      />
      <View className="flex flex-row gap-4">
        {tabs.map(({ title, onClick }, index) => (
          <PassButton onPress={onClick} key={index}>
            <PassText
              className={classNames('text-xl font-bold text-headingText', {
                '!text-unfocusedTabColor': tabIndex !== index,
              })}
            >
              {title}
            </PassText>
          </PassButton>
        ))}
      </View>
      {/* Create a dedicated tab component */}
      {tabIndex === 0 &&
        (tokens.length > 0 ? (
          <ScrollView contentContainerClassName="px-4 mt-[18px] pb-10">
            {tokens?.map((token, index) => (
              <TokenRow
                fiatBalance={
                  convertCryptoToFiat(+token.balance, token.symbol) ?? 0
                }
                networks={networks}
                onPress={handlePressToken}
                key={index}
                tokenData={token}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="w-full flex-1 items-center justify-center">
            <PassText className="text-5 mb-2 text-center text-xl font-bold">
              {t('wallet.noTokens')}
            </PassText>
            <PassText className="text-center text-base font-normal">
              {t('wallet.transactTokens')}
            </PassText>
          </View>
        ))}
    </ExpandingSafeAreaView>
  );
}
