import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';
import { shortenText } from '~shared/utils/helpers/address';
import { isEthAddressValid } from '~wallet/utils/addressUtils';

const MAX_ADDRESS_LENGTH = 42;

export function AddressInputField({
  containerClassName,
  onChange,
  truncate,
}: AddressInputFieldProps) {
  const [address, setAddress] = useState('');
  const isAddressValid = useMemo(() => isEthAddressValid(address), [address]);
  const { t } = useTranslation();

  const handleInputChange = (text: string) => {
    setAddress(text);
    const isValid = isEthAddressValid(text);
    onChange?.({
      value: text,
      error: !isValid ? t('wallet.invalidAddressError') : null,
    });
  };

  const handleClearPress = () => {
    setAddress('');
    onChange?.({
      value: '',
      error: null,
    });
  };

  const handlePasteFromClipboard = async () => {
    const clipboardData = await Clipboard.getString();

    if (clipboardData.length <= MAX_ADDRESS_LENGTH) {
      setAddress(clipboardData);
      const isValid = isEthAddressValid(clipboardData);

      onChange?.({
        value: clipboardData,
        error: !isValid ? t('wallet.invalidAddressError') : null,
      });
    } else {
      onChange?.({ value: '', error: 'This is an invalid input' });
    }
  };

  return (
    <View
      className={classNames(
        'flex-row items-center border border-transparent border-y-borderColor px-4',
        containerClassName
      )}
    >
      <PassText className="mr-6 text-base text-textUnfocused">To:</PassText>
      {!truncate && (
        <TextInput
          className={classNames(
            'h-addressTextInput flex-1 border-borderColor border-transparent font-semibold',
            { ['color-errorText']: !isAddressValid }
          )}
          value={address}
          maxLength={MAX_ADDRESS_LENGTH}
          onChangeText={handleInputChange}
        />
      )}
      {truncate && (
        <PassText className="h-addressTextInput flex-1 py-6 font-semibold">
          {shortenText(address)}
        </PassText>
      )}
      <TouchableOpacity
        className="px-5"
        onPress={
          address.length > 0 ? handleClearPress : handlePasteFromClipboard
        }
      >
        <PassText className="font-bold text-primary">
          {address.length > 0 ? 'Clear' : 'Paste'}
        </PassText>
      </TouchableOpacity>
    </View>
  );
}

interface AddressInputFieldProps {
  containerClassName?: string;
  value?: string;
  onChange?: (args: AddressInputResponse) => void;
  truncate?: boolean;
}
