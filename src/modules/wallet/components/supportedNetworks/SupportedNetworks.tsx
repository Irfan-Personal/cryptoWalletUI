import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { DataRenderer } from '~shared/components/dataRenderer/DataRenderer';
import { List } from '~shared/components/list/List';
import { PassModal } from '~shared/components/passModal/PassModal';
import { BlockchainNetwork } from '~shared/connectivity/network/network';
import { useNetworks } from '~shared/connectivity/network/useNetworks';

import { ChainDisplay } from '../chainDisplay/ChainDisplay';

function Networks({ networks }: { networks?: BlockchainNetwork[] }) {
  return (
    <List
      data={networks}
      renderItem={({ item }) => (
        <ChainDisplay
          chain={item}
          className="!h-10 !w-10"
          wrapperClassName="p-4"
          textClassName="text-lg !font-semibold"
        />
      )}
    />
  );
}

export function SupportedNetworksModal({
  isVisible,
  onClose,
}: NetworkSelectDropdownProps) {
  const { t } = useTranslation();
  const networksResponse = useNetworks();
  const data = networksResponse.data?.data.networks;
  const networks = data ? { networks: data } : undefined;

  return (
    <PassModal
      noWrapper
      headerText={t('wallet.receiveScreen.supportedNetworks')}
      className="bg-red max-h-[60%] px-2 pt-4"
      isVisible={isVisible}
      onClose={onClose}
    >
      <SafeAreaView>
        <DataRenderer
          data={networks}
          RenderComponent={Networks}
          loading={networksResponse.isLoading}
          hasError={networksResponse.isError}
          onRetry={networksResponse.refetch}
        />
      </SafeAreaView>
    </PassModal>
  );
}

interface NetworkSelectDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}
