import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import classNames from 'classnames';
import DownloadIcon from '~shared/assets/svgs/downloadIcon.svg';
import { PassButton } from '~shared/components/passButton/PassButton.tsx';
import { PassText } from '~shared/components/passText/PassText';
import { RootScreens } from '~src/layouts/RootNavigation.tsx';

export function NoTransactionSection({ className }: NoTransactionSectionProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();

  const onReceive = () => {
    navigation.navigate(RootScreens.ReceiveScreen);
  };

  return (
    <View className={classNames(className, 'flex-1')}>
      <View className="flex-1 items-center justify-center">
        <View className="h-24 w-24 rounded-full bg-lightBlue" />
        <PassText className="mt-4 font-semibold">
          {t('transaction.noTransactions.title')}
        </PassText>
        <PassText className="mt-4 text-center text-base">
          {t('transaction.noTransactions.description')}
        </PassText>
      </View>
      <PassButton
        className="mb-12 mt-auto items-center justify-center gap-x-1"
        variant="filled"
        onPress={onReceive}
      >
        <DownloadIcon className="text-white" />
        <PassText className="ml-2 text-base font-bold text-white">
          {t('shared.receive')}
        </PassText>
      </PassButton>
    </View>
  );
}

interface NoTransactionSectionProps {
  className?: string;
}
