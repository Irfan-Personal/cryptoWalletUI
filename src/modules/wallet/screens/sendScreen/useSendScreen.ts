import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions } from 'react-native';
import { useUserProfile } from '~account/connectivity/userProfile/useUserProfile';
import { stampUserOp } from '~authentication/libs/passkey/passkey';
import { CryptoAmount } from '~shared/components/cryptoAmount/CryptoAmount';
import { FiatAmount } from '~shared/components/fiatAmount/FiatAmount';
import { ApiMethods } from '~shared/interfaces/network.interface';
import {
  isValidCryptoAmount,
  isValidFiatAmount,
  truncateNumber,
  viewAmountInCrypto,
  viewAmountInFiat,
} from '~shared/utils/helpers/currencyFormatter';
import { request } from '~shared/utils/network/request';
import { Token } from '~token/connectivity/token/token';
import { useTokens } from '~token/connectivity/token/useTokens';
import { useCurrencyConverter } from '~token/utils/hooks/useCurrencyConverter';
import { useFeeEstimate } from '~transaction/connectivity/fees/useFeeEstimates';
import { sendUserOp } from '~wallet/connectivity/wallet/sendUserOp';
import { USER_OP_API, useUserOp } from '~wallet/connectivity/wallet/useUserOp';
import { useWallets } from '~wallet/connectivity/wallet/useWallets';
import { AmountInputModes } from '~wallet/types/wallet.enums';

const CHAIN_ID = '80001';

export function useSendScreen() {
  const { t } = useTranslation();

  const steps = [
    { title: t('wallet.useSendScreen.enterAddress'), step: 0 },
    { title: t('wallet.useSendScreen.send'), step: 1 },
    { title: t('wallet.useSendScreen.enterAmount'), step: 2 },
  ];
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('0');
  const [address, setAddress] = useState<AddressInputResponse>({ value: '' });
  const [amountInputMode, setAmountInputMode] = useState<AmountInputModes>(
    AmountInputModes.fiat
  );
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const { userProfile } = useUserProfile({ isEnabled: false });
  const { wallets } = useWallets();

  const selectedWallet = wallets?.[0];

  const tokensResponse = useTokens(
    { walletAddress: selectedWallet?.address },
    { enabled: !!selectedWallet?.address }
  );

  const userOpRequestPayload = {
    amount,
    recipientAddress: address.value,
    chainId: CHAIN_ID,
  };

  const userOpResponse = useUserOp(userOpRequestPayload, {
    enabled: !!address.value && !!amount,
  });
  const feeEstimatesResponse = useFeeEstimate(
    { userOp: userOpResponse.data?.data.userOp, chainId: CHAIN_ID },
    { enabled: userOpResponse.isSuccess }
  );
  const { convertCryptoToFiat, convertFiatToCrypto } = useCurrencyConverter({
    tokenSymbols:
      tokensResponse.data?.data?.tokens
        .map(({ symbol }) => symbol)
        ?.concat?.(feeEstimatesResponse.symbol || '') || [],
  });

  const fiatFeeValue =
    convertCryptoToFiat(
      +feeEstimatesResponse.feeEstimate,
      feeEstimatesResponse.symbol || ''
    ) ?? 0;

  const PrimaryAmount =
    amountInputMode === AmountInputModes.fiat ? FiatAmount : CryptoAmount;
  const SecondaryAmount =
    amountInputMode === AmountInputModes.fiat ? CryptoAmount : FiatAmount;

  const handleChangeAmount = ({ value }: { value: string }) => {
    const isEntryValid =
      amountInputMode === AmountInputModes.crypto
        ? isValidCryptoAmount(value)
        : isValidFiatAmount(value);

    if (!isEntryValid) return;

    let cryptoValue = 0;

    if (amountInputMode === AmountInputModes.crypto) {
      cryptoValue = +value;
    } else {
      cryptoValue =
        convertFiatToCrypto(+value, selectedToken?.symbol || '') ?? 0;
    }

    if (selectedToken && cryptoValue > +selectedToken.balance) {
      Alert.alert('Sorry, your amount cannot be more than your token balance');

      return;
    }

    setAmount(value);
  };

  const handleToggleEditMode = () => {
    if (AmountInputModes.crypto === amountInputMode) {
      setAmount((value) => `${truncateNumber(+value)}`);
    }

    setAmountInputMode((value) =>
      AmountInputModes.fiat === value
        ? AmountInputModes.crypto
        : AmountInputModes.fiat
    );
  };

  const getSubAmount = () => {
    if (AmountInputModes.fiat === amountInputMode) {
      return convertFiatToCrypto(+amount || 0, selectedToken?.symbol || '');
    }

    if (AmountInputModes.crypto === amountInputMode) {
      return convertCryptoToFiat(+amount || 0, selectedToken?.symbol || '');
    }
  };

  const getUserOpHash = async () => {
    const response = await request<UserOpRequest, UserOpResponse>({
      config: {
        path: USER_OP_API,
        method: ApiMethods.GET,
        data: userOpRequestPayload,
      },
    });

    return {
      userOpHash: response.meta.userOpHash,
      userOp: response.data.userOp,
    };
  };

  const handleGoBack = () => {
    if (currentStep.step > 0) setCurrentStep(steps[currentStep.step - 1]);
  };

  const handleAddressInputChange = (response: AddressInputResponse) => {
    setAddress(response);

    if (!!response.error || !response.value) setCurrentStep(steps[0]);
  };

  const getAmountSize = () => {
    const screenWidth = Dimensions.get('window').width;

    if (screenWidth / amount.length < 30) return '!text-[40px]';
    if (screenWidth / amount.length < 50) return '!text-[50px]';
    if (screenWidth / amount.length < 60) return '!text-[60px]';
  };

  const useMaxBalance = () => {
    const walletCryptoBalance = +viewAmountInCrypto(
      selectedToken?.balance || 0
    );
    const cryptoFeeValue = +feeEstimatesResponse.feeEstimate || 0;
    const maximumSendableAmount = walletCryptoBalance - cryptoFeeValue;

    if (maximumSendableAmount <= 0) {
      Alert.alert('Sorry, available balance would result to a negative amount');

      return;
    }

    let maxCryptoValueToSend = maximumSendableAmount;

    if (amountInputMode === AmountInputModes.fiat) {
      maxCryptoValueToSend = +viewAmountInFiat(
        `${convertCryptoToFiat(
          maxCryptoValueToSend,
          selectedToken?.symbol || ''
        )}`
      );
    }

    setAmount(maxCryptoValueToSend.toString());
  };

  const handleContinue = async () => {
    if (currentStep.step < steps.length - 1) {
      return setCurrentStep(steps[currentStep.step + 1]);
    }

    const { userOpHash, userOp } = await getUserOpHash();

    if (!userProfile?.turnkeyWalletAddress || !userOpHash) {
      Alert.alert('Unable to sign this transaction. Please try again later.');
    }

    try {
      const signedUserOp = await stampUserOp({
        userOpHash,
        walletAddress: userProfile?.turnkeyWalletAddress || '',
        subOrgId: userProfile?.turnKeySubOrgId || '',
      });

      const signature = signedUserOp.activity.result.signRawPayloadResult;

      const result = await sendUserOp({
        userOp,
        signature,
        chainId: CHAIN_ID,
      });

      // @todo: remove and properly integrate navigation to the success screen when transaction signing is successful.
      console.log('result:::-- ', result);
    } catch (exp) {
      Alert.alert('Unable to sign this transaction. Please try again later.');
    }
  };

  return {
    selectedToken,
    currentStep,
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
    handleUseMaxBalance: useMaxBalance,
    fiatFeeValue,
    selectedWallet,
  };
}
