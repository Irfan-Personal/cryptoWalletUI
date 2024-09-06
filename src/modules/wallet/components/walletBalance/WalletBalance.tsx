import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import DownloadIcon from '~shared/assets/svgs/downloadIcon.svg';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { FiatCurrency } from '~shared/constants';

export function WalletBalance({
  balance,
  currency,
  onSend = () => {},
  onReceive = () => {},
}: WalletBalanceProps) {
  const { t } = useTranslation();

  return (
    <View className="w-full px-4 py-11 pb-6">
      <View className="self-center">
        <FiatAmount
          currency={currency}
          amount={balance}
          className="text-center text-[32px] font-bold"
        />
      </View>
      <View className="mt-[30px] flex w-full flex-row items-center justify-center gap-x-2">
        <PassButton
          className="min-w-44 flex-1 items-center justify-center gap-x-1"
          variant="filled"
          onPress={onReceive}
        >
          <DownloadIcon className="text-white" />
          <PassText className="text-base font-bold text-white">
            {t('wallet.receive')}
          </PassText>
        </PassButton>
        <PassButton
          className="min-w-44 flex-1 items-center justify-center gap-x-1"
          variant="filled"
          onPress={onSend}
        >
          <DownloadIcon className="rotate-180 text-white" />
          <PassText className="text-base font-bold text-white">
            {t('wallet.send')}
          </PassText>
        </PassButton>
      </View>
    </View>
  );
}

interface WalletBalanceProps {
  currency: FiatCurrency;
  balance: string | number;
  onSend?: () => void;
  onReceive?: () => void;
}
