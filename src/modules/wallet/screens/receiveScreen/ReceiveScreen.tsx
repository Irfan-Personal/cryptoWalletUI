import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TouchableOpacity, View } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { ChainDisplay } from '~network/components/chainDisplay/ChainDisplay';
import ShareIcon from '~shared/assets/svgs/shareIcon.svg';
import CopyToClipboard from '~shared/components/copyToClipboard/CopyToClipboard';
import { Heading } from '~shared/components/heading/Heading';
import { PageWrapper } from '~shared/components/pageWrapper/PageWrapper';
import { PassButton } from '~shared/components/passButton/PassButton.tsx';
import { PassText } from '~shared/components/passText/PassText';
import { QrComponent } from '~shared/components/qrComponent/qrComponent';
import { useNetworks } from '~shared/connectivity/network/useNetworks';
import { shortenText } from '~shared/utils/helpers/address';
import { SupportedNetworksModal } from '~wallet/components/supportedNetworks/SupportedNetworks';
import { useWallets } from '~wallet/connectivity/wallet/useWallets';

export function ReceiveScreen() {
  const navigation = useNavigation();
  const networksResponse = useNetworks();
  const { data } = useWallets();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const walletAddress = data?.data?.wallets[0].address ?? '';
  const networks = networksResponse.data?.data.networks || [];

  const handleShare = () => {
    const options: ShareOptions = {
      message: walletAddress,
    };

    Share.open(options)
      .then(() => {
        Alert.alert('Wallet address was successfully shared.');
      })
      .catch((err: { message: string }) => {
        if (err.message !== 'User did not share') {
          Alert.alert('Unable to share your wallet address.');
        }
      });
  };

  return (
    <>
      <SupportedNetworksModal
        isVisible={isVisible}
        onClose={() => setIsVisible(!isVisible)}
      />
      <PageWrapper className="bg-white">
        <Heading
          hideBackButton
          isModal
          title={t('wallet.receive')}
          className="mt-4 py-4"
          onClose={navigation.goBack}
        />
        <View className="flex-column mt-[50px] flex-1 items-center px-4">
          {walletAddress && <QrComponent qrData={walletAddress} qrSize={231} />}
          <PassText className="mt-7 text-lg font-semibold text-textUnfocused">
            {t('wallet.receiveScreen.myAddress')}:{' '}
            <PassText className="font-bold">
              {shortenText(walletAddress)}
            </PassText>
          </PassText>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            className="mb-7 mt-4 flex-row items-center"
          >
            {networks.map((network, index) => (
              <ChainDisplay
                iconOnly
                key={index}
                className=" -ml-2 h-9 w-9 rounded-full border-2 border-white bg-white"
                chain={network}
              />
            ))}
          </TouchableOpacity>
          <View className="flex-row items-center justify-center gap-x-2">
            <CopyToClipboard
              isButton
              textToCopy={walletAddress}
              variant="filled"
              className="max-w-48 flex-1 items-center justify-center gap-x-1"
            >
              <PassText className="text-base font-bold text-white">
                {t('wallet.receiveScreen.copy')}
              </PassText>
            </CopyToClipboard>
            <PassButton
              className="max-w-48 flex-1 items-center justify-center gap-x-2"
              variant="filled"
              onPress={handleShare}
            >
              <ShareIcon className="text-white" />
              <PassText className="text-base font-bold text-white">
                {t('wallet.receiveScreen.share')}
              </PassText>
            </PassButton>
          </View>
        </View>
      </PageWrapper>
    </>
  );
}
