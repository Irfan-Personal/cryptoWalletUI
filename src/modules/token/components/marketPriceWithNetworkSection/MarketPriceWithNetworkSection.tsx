import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import classNames from 'classnames';
import UpArrow from '~shared/assets/svgs/upArrow.svg';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassText } from '~shared/components/passText/PassText';
import { BlockchainNetwork } from '~shared/connectivity/network/network.d';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants.ts';
import { MarketTokenDetail } from '~token/connectivity/marketToken/marketToken';

export function MarketPriceWithNetworkSection({
  className,
  tokenDetail,
  network,
  fiatExchangeRate,
}: {
  className?: string;
  tokenDetail?: MarketTokenDetail;
  network: BlockchainNetwork;
  fiatExchangeRate: number;
}) {
  const { t } = useTranslation();
  const { dayChangePercentage } = tokenDetail || {};

  return (
    <View className={classNames(className, 'flex-row justify-between')}>
      <View>
        <PassText className="text-base  color-textUnfocused">
          {t('token.marketPrice')}
        </PassText>
        <View className="flex-row items-center text-lg font-bold">
          <FiatAmount
            currency={DEFAULT_FIAT_CURRENCY}
            amount={fiatExchangeRate}
          />
          <View className=" flex-row items-center pl-1">
            <UpArrow className="mr-1 w-[13px] color-positive" />
            <PassText className="text-base font-normal color-positive">
              {dayChangePercentage}%
            </PassText>
          </View>
        </View>
      </View>
      <View className="items-end">
        <PassText className="text-base color-textUnfocused">
          {t('token.networks')}
        </PassText>
        <View className="mt-1 h-6 w-6 items-center justify-center rounded-full bg-primary ">
          {network?.networkIconUrl ? (
            <Image
              className="h-full w-full rounded-full"
              source={{
                uri: network.networkIconUrl,
              }}
            />
          ) : (
            <PassText className="text-[6px] font-extrabold text-white">
              {network.name[0]}
            </PassText>
          )}
        </View>
      </View>
    </View>
  );
}
