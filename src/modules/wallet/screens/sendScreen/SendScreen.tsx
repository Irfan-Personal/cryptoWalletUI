import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import classNames from 'classnames';
import VerticalExchangeIcon from '~shared/assets/svgs/vertical-exchange-icon.svg';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { Heading } from '~shared/components/heading/Heading';
import { NumberKeyboard } from '~shared/components/numberKeyboard/NumberKeyboard';
import { PageWrapper } from '~shared/components/pageWrapper/PageWrapper';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { DEFAULT_FIAT_CURRENCY } from '~shared/constants';
import { TokenSelectDropdown } from '~token/components/tokenSelectDropdown/TokenSelectDropdown';
import { AddressInputField } from '~wallet/components/addressInputField/AddressInputField';

import { useSendScreen } from './useSendScreen';

export function SendScreen() {
  const navigation = useNavigation<Navigation>();
  const {
    selectedToken,
    setSelectedToken,
    address,
    amount,
    handleChangeAmount,
    handleToggleEditMode,
    PrimaryAmount,
    SecondaryAmount,
    getSubAmount,
    handleContinue,
    handleGoBack,
    handleAddressInputChange,
    getAmountSize,
    handleUseMaxBalance,
    currentStep,
    fiatFeeValue,
    selectedWallet,
  } = useSendScreen();
  const { t } = useTranslation();

  return (
    <PageWrapper className="bg-white">
      <Heading
        onClose={navigation.goBack}
        onGoBack={handleGoBack}
        isModal
        title={currentStep.title}
      />
      <AddressInputField
        truncate={currentStep.step > 0}
        onChange={handleAddressInputChange}
      />
      {!!address.error && (
        <View className="p-4">
          <View className="rounded-xl bg-lightBlue p-3 ">
            <PassText className="text-xs font-normal">{address.error}</PassText>
          </View>
        </View>
      )}
      {!address.error && !!address.value && currentStep.step >= 1 && (
        <TokenSelectDropdown
          onSelectToken={setSelectedToken}
          onUseMax={handleUseMaxBalance}
          selectedToken={selectedToken}
          walletAddress={selectedWallet.address}
        />
      )}
      <View className="flex-1 p-4">
        <View className="flex-1 justify-end pb-6">
          {!address.error && !!address.value && currentStep.step === 2 && (
            <>
              <View className="flex-row items-start gap-x-1 self-center px-[20px]">
                <PrimaryAmount
                  noFormatting
                  amount={amount}
                  currency={DEFAULT_FIAT_CURRENCY}
                  tokenSymbol={selectedToken?.symbol}
                  amountClassName={classNames(
                    'text-[80px] font-bold text-center',
                    getAmountSize()
                  )}
                  symbolClassName="mt-4 text-2xl font-bold"
                />
              </View>
              <PassButton
                onPress={handleToggleEditMode}
                className="mb-8 mt-6 flex-row items-center gap-x-1"
              >
                <SecondaryAmount
                  className="text-2xl font-bold"
                  amount={getSubAmount() || 0}
                  tokenSymbol={selectedToken?.symbol}
                  currency={DEFAULT_FIAT_CURRENCY}
                />
                <VerticalExchangeIcon className="scale-[0.8] color-black" />
              </PassButton>
              <View className="mb-8 flex-row items-center justify-center">
                <PassText className="text-textUnfocused">
                  Estimated fee:{' '}
                </PassText>
                <FiatAmount
                  className="text-textUnfocused"
                  amount={fiatFeeValue || 0}
                  currency={DEFAULT_FIAT_CURRENCY}
                />
              </View>
              <NumberKeyboard value={amount} onChange={handleChangeAmount} />
            </>
          )}
        </View>
        <PassButton
          disabled={!!address.error || !address.value}
          onPress={handleContinue}
          className="p-4"
          variant="filled"
        >
          <PassText
            className={classNames('pt-[2px] font-bold text-white', {
              ['color-disabledText font-normal']:
                !!address.error || !address.value,
            })}
          >
            {currentStep.step === 2
              ? t('wallet.sendScreen.send')
              : t('wallet.sendScreen.continue')}
          </PassText>
        </PassButton>
      </View>
    </PageWrapper>
  );
}
