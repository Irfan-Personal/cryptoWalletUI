import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { DataRenderer } from '~shared/components/dataRenderer/DataRenderer';
import { PassText } from '~shared/components/passText/PassText';
import { useWallets } from '~wallet/connectivity/wallet/useWallets';

import { ProfileScreen } from './ProfileScreen';

export function ProfileScreenContainer() {
  const { data, isLoading, isError, refetch } = useWallets();
  const { t } = useTranslation();

  const address = data?.data?.wallets[0].address ?? '';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PassText className="text-center text-2xl font-bold">
        {t('account.profile.title')}
      </PassText>
      <DataRenderer
        data={{ address }}
        RenderComponent={ProfileScreen}
        loading={isLoading}
        hasError={isError}
        onRetry={refetch}
      />
    </SafeAreaView>
  );
}
