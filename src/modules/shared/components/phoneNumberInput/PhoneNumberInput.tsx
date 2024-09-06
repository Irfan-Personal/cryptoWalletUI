import React, { useRef } from 'react';
import { Alert, TextInput, TextInputProps, View } from 'react-native';
import { PassText } from '~shared/components/passText/PassText';

interface PhoneNumberInputProp {
  label?: string;
  prefix?: string;
  onChangePrefix?: (arg: string) => void;
  number?: string;
  onChangeNumber?: (arg: string) => void;
}

const MAX_PHONE_NUMBER_PREFIX_LENGTH = 5;
const MAX_PHONE_NUMBER_BODY_LENGTH = 15;

export function PhoneNumberInput({
  label,
  prefix,
  number,
  onChangePrefix,
  onChangeNumber,
}: TextInputProps & PhoneNumberInputProp) {
  const numberRef = useRef<TextInput>(null);

  const handleChangePrefix = (value: string) => {
    if (
      new RegExp(`/^\\+?\\d{${MAX_PHONE_NUMBER_PREFIX_LENGTH}}$/`).test(value)
    ) {
      Alert.alert('Invalid phone number prefix provided');

      return;
    }

    if (value.length >= MAX_PHONE_NUMBER_PREFIX_LENGTH) {
      numberRef.current?.focus();
    }
    onChangePrefix?.(value);
  };

  const handleChangeNumber = (value: string) => {
    if (new RegExp(`^\\d{${MAX_PHONE_NUMBER_BODY_LENGTH}}$`).test(value)) {
      Alert.alert('Invalid phone number prefix provided');

      return;
    }

    onChangeNumber?.(value);
  };

  return (
    <View className="w-full">
      <PassText className="text mb-2 text-[14px] font-normal">{label}</PassText>
      <View className="flex w-full flex-row gap-x-4">
        <View className="w-[50px]">
          <TextInput
            maxLength={MAX_PHONE_NUMBER_PREFIX_LENGTH}
            value={prefix}
            onChangeText={handleChangePrefix}
            placeholder="+49"
            keyboardType="phone-pad"
            className="w-full rounded-[5px] border border-solid border-borderColor px-3 py-4 text-headingText"
          />
        </View>
        <View className="flex-1">
          <TextInput
            ref={numberRef}
            maxLength={MAX_PHONE_NUMBER_BODY_LENGTH}
            value={number}
            textContentType="telephoneNumber"
            onChangeText={handleChangeNumber}
            keyboardType="number-pad"
            placeholder="phone number"
            className="w-full rounded-[5px] border border-solid border-borderColor px-3 py-4 text-headingText"
          />
        </View>
      </View>
    </View>
  );
}
