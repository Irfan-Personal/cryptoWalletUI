import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import classNames from 'classnames';
import { ChainDisplay } from '~network/components/chainDisplay/ChainDisplay';
import DropdownArrow from '~shared/assets/svgs/dropdownArrow.svg';
import { PassText } from '~shared/components/passText/PassText';
import { BlockchainNetwork } from '~shared/connectivity/network/network.d';
import { CurrencySymbols, DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { truncateText } from '~shared/utils/helpers';
import { MarketTokenDetail } from '~token/connectivity/marketToken/marketToken';

export function TokenDetail({
  className,
  tokenDetail,
  chain,
}: {
  className?: string;
  tokenDetail?: MarketTokenDetail;
  chain: BlockchainNetwork;
}) {
  const [isMoreDetailsRevealed, setIsMoreDetailsRevealed] = useState(false);
  const {
    popularity,
    marketCap,
    dayVolume,
    description,
    totalSupply,
    circulatingSupply,
  } = tokenDetail || {};
  const { t } = useTranslation();
  const moreDetails = [
    {
      name: t('wallet.tokenDetails.popularity'),
      value: `#${popularity}`,
    },
    {
      name: t('wallet.tokenDetails.marketCap'),
      value: `${CurrencySymbols[DEFAULT_FIAT_CURRENCY]}${marketCap}`,
    },
    {
      name: t('wallet.tokenDetails.24hVolume'),
      value: `${CurrencySymbols[DEFAULT_FIAT_CURRENCY]}${dayVolume}`,
    },
    {
      name: t('wallet.tokenDetails.totalSupply'),
      value: `${CurrencySymbols[DEFAULT_FIAT_CURRENCY]}${totalSupply}`,
    },
    {
      name: t('wallet.tokenDetails.circulatingSupply'),
      value: `${CurrencySymbols[DEFAULT_FIAT_CURRENCY]}${circulatingSupply}`,
    },
    {
      name: t('wallet.tokenDetails.chain'),
      value: <ChainDisplay chain={chain} className="" />,
    },
  ];

  return (
    <View className={classNames(className)}>
      <PassText className="mt-6 text-lg font-bold">Description</PassText>
      <PassText className="mt-3 text-base">
        {truncateText(
          description,
          !isMoreDetailsRevealed ? 350 : description?.length || 0
        )}
      </PassText>
      <TouchableOpacity
        onPress={() => setIsMoreDetailsRevealed((state) => !state)}
        className="mt-2 w-[110px]"
      >
        <PassText className="font-bold color-primary">
          Read more{' '}
          <DropdownArrow
            className={classNames('color-primary', {
              ['rotate-180']: isMoreDetailsRevealed,
            })}
          />
        </PassText>
      </TouchableOpacity>
      {isMoreDetailsRevealed && (
        <View className="mt-4 w-full">
          {moreDetails.map(({ name, value }, index) => (
            <View
              key={name}
              className={classNames(
                'w-full flex-row justify-between rounded-xl p-[18px] py-3',
                { ['bg-lightBlue']: index % 2 !== 0 }
              )}
            >
              <PassText className="color-textUnfocused">{name}</PassText>
              {typeof value === 'string' ? <PassText>{value}</PassText> : value}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
