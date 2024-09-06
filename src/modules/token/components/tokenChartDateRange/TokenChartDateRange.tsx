import React, { useState } from 'react';
import { View } from 'react-native';
import { LineGraph } from 'react-native-graph';
import classNames from 'classnames';
import { DateRangeSelector } from '~shared/components/dateRangeSelector/DateRangeSelector';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants.ts';
import { PriceDurations } from '~token/connectivity/priceHistoryToken/priceHistoryToken.d';
import { usePriceHistoryToken } from '~token/connectivity/priceHistoryToken/usePriceHistoryToken';

export function TokenChartDateRange({ className }: { className?: string }) {
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  const tokenPriceHistoryResponse = usePriceHistoryToken({
    duration: selectedDuration.value,
    tokenSymbol: 'ETH',
    fiatCurrency: DEFAULT_FIAT_CURRENCY,
  });

  const tokenPriceHistory =
    tokenPriceHistoryResponse.data?.data?.history?.map(
      ({ price, timestamp }) => ({
        value: Number(price),
        date: new Date(timestamp),
      })
    ) || [];

  return (
    <View className={classNames(className)}>
      <DateRangeSelector
        durations={durations}
        setSelectedDuration={setSelectedDuration}
        selectedDuration={selectedDuration}
      />
      <View className="mt-8">
        <LineGraph
          style={{ height: 200 }}
          animated
          enablePanGesture
          enableFadeInMask
          points={tokenPriceHistory}
          color="#0D1821"
        />
      </View>
    </View>
  );
}

const durations = [
  { name: '1D', value: PriceDurations.oneDay },
  { name: '7D', value: PriceDurations.sevenDays },
  { name: '1M', value: PriceDurations.oneMonth },
  { name: '1Y', value: PriceDurations.oneYear },
  { name: 'ALL', value: PriceDurations.all },
];
