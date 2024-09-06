import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassText } from '~shared/components/passText/PassText';
import { ExpandingSafeAreaView } from '~src/modules/shared/components/expandingSafeAreaView/ExpandingSafeAreaView';
import { DEFAULT_FIAT_CURRENCY } from '~src/modules/shared/constants';
import { useNetworksMap } from '~src/modules/shared/utils/hooks/useNetworksMap';
import { MarketPriceWithNetworkSection } from '~token/components/marketPriceWithNetworkSection/MarketPriceWithNetworkSection';
import { TokenChartDateRange } from '~token/components/tokenChartDateRange/TokenChartDateRange';
import { TokenDetail } from '~token/components/tokenDetail/TokenDetail';
import { TokenIcon } from '~token/components/tokenIcon/TokenIcon';
import { useMarketToken } from '~token/connectivity/marketToken/useMarketToken';
import { Token } from '~token/connectivity/token/token';
import { useFiatExchangeRate } from '~token/screens/tokenDetailsScreen/utils';

export function TokenDetailsScreen() {
  const routes = useRoute<RouteProp<{ params: { token: Token } }>>();
  const { token } = routes.params;
  const navigation = useNavigation();
  const networks = useNetworksMap();
  const marketTokenDetailResponse = useMarketToken({ symbol: 'ETH' });
  const fiatExchangeRate = useFiatExchangeRate(token.symbol);

  const tokenDetail = marketTokenDetailResponse.data?.data?.details;

  return (
    <ExpandingSafeAreaView className="bg-white">
      <ScrollView contentContainerClassName="pb-6">
        <View className="p-[14px]">
          <View className="mt-4 h-11 items-end justify-center p-[11px]">
            <TouchableOpacity
              onPress={navigation.goBack}
              className="h-[22px] w-[22px] items-center justify-center rounded-full bg-unfocusedTabColor p-0"
            >
              <PassText className="color-white">x</PassText>
            </TouchableOpacity>
          </View>
          <TokenIcon className={'mr-3'} networks={[]} token={token} />
          <View className="mt-[10px] w-full">
            <View className="w-full flex-row items-start justify-between">
              <PassText className="max-w-[60%] text-[24px] font-bold">
                {token.name}
              </PassText>
              <FiatAmount
                className="text-[24px] font-bold"
                amount={(Number(token.balance) * fiatExchangeRate).toFixed(2)}
                currency={DEFAULT_FIAT_CURRENCY}
              />
            </View>
            <View className="w-full items-end">
              <PassText className="text-lg font-bold text-textUnfocused">
                {+token.balance} {token.symbol}
              </PassText>
            </View>
          </View>
          <TokenChartDateRange />
          <MarketPriceWithNetworkSection
            className="mt-[30px]"
            network={networks[token.networkId]}
            tokenDetail={tokenDetail}
            fiatExchangeRate={fiatExchangeRate}
          />
          <TokenDetail
            tokenDetail={tokenDetail}
            chain={networks[token.networkId]}
          />
        </View>
      </ScrollView>
    </ExpandingSafeAreaView>
  );
}
